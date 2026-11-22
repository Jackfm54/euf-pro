const STRIPE_API = "https://api.stripe.com/v1";
const DAY_MS = 86_400_000;
const WEBHOOK_TOLERANCE_SECONDS = 300;

export type PaidTier = "etudiant" | "sprint";

export type StripeCheckoutPayload = {
  id: string;
  mode?: string | null;
  payment_status?: string | null;
  client_reference_id?: string | null;
  customer?: string | { id: string } | null;
  subscription?: string | { id: string } | null;
  metadata?: Record<string, string | undefined> | null;
};

export type StripeSubscriptionPayload = {
  id: string;
  status?: string | null;
  cancel_at_period_end?: boolean | null;
  current_period_start?: number | null;
  current_period_end?: number | null;
  customer?: string | { id: string } | null;
  metadata?: Record<string, string | undefined> | null;
};

export function isStripeConfigured(env: Record<string, string | undefined> = process.env): boolean {
  return Boolean(
    env["STRIPE_SECRET_KEY"]?.trim() &&
      env["STRIPE_PRICE_ETUDIANT"]?.trim() &&
      env["STRIPE_PRICE_SPRINT"]?.trim(),
  );
}

export function resolveAppOrigin(
  candidate: string | undefined,
  env: Record<string, string | undefined> = process.env,
): string {
  const configured = env["APP_URL"]?.trim();
  const raw = configured || candidate || "";
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error("Invalid application URL");
  }
  const isHttps = parsed.protocol === "https:";
  const isLocal =
    parsed.protocol === "http:" &&
    (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1");
  if (!isHttps && !isLocal) throw new Error("Application URL must use HTTPS");
  return parsed.origin;
}

function idOf(value: string | { id: string } | null | undefined): string | null {
  if (!value) return null;
  return typeof value === "string" ? value : value.id || null;
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length || a.length === 0) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function verifyStripeSignature(
  rawBody: string,
  signatureHeader: string | null,
  webhookSecret: string,
  nowSec = Math.floor(Date.now() / 1000),
): Promise<boolean> {
  if (!signatureHeader || !webhookSecret) return false;
  const parts = signatureHeader.split(",").map((part) => part.trim());
  let timestamp: number | null = null;
  const signatures: string[] = [];
  for (const part of parts) {
    const eq = part.indexOf("=");
    if (eq <= 0) continue;
    const key = part.slice(0, eq);
    const val = part.slice(eq + 1);
    if (key === "t") {
      const n = Number(val);
      if (Number.isInteger(n) && n > 0) timestamp = n;
    } else if (key === "v1" && val) {
      signatures.push(val);
    }
  }
  if (!timestamp || signatures.length === 0) return false;
  if (Math.abs(nowSec - timestamp) > WEBHOOK_TOLERANCE_SECONDS) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(webhookSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const digest = await crypto.subtle.sign("HMAC", key, encoder.encode(`${timestamp}.${rawBody}`));
  const expected = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return signatures.some((sig) => timingSafeEqualHex(sig.toLowerCase(), expected));
}

export function entitlementFromCheckout(session: StripeCheckoutPayload, nowMs = Date.now()) {
  const userId = session.metadata?.["user_id"] || session.client_reference_id || null;
  const tier = session.metadata?.["tier"];
  if (!userId || (tier !== "etudiant" && tier !== "sprint")) return null;
  if (tier === "sprint" && session.payment_status !== "paid") return null;
  if (tier === "etudiant" && session.payment_status !== "paid" && session.mode !== "subscription") {
    return null;
  }

  const nowIso = new Date(nowMs).toISOString();
  const days = tier === "sprint" ? 60 : 31;
  const validUntil = new Date(nowMs + days * DAY_MS).toISOString();

  return {
    user_id: userId,
    plan: tier === "sprint" ? ("one_time" as const) : ("monthly" as const),
    tier,
    status: "active" as const,
    period_start: nowIso,
    valid_until: validUntil,
    ai_denial_reason: null,
    updated_at: nowIso,
    stripe_customer_id: idOf(session.customer),
    stripe_subscription_id: tier === "etudiant" ? idOf(session.subscription) : null,
    stripe_checkout_session_id: session.id,
  };
}

export function entitlementFromSubscription(sub: StripeSubscriptionPayload, nowMs = Date.now()) {
  const nowIso = new Date(nowMs).toISOString();
  const periodEndMs = sub.current_period_end ? sub.current_period_end * 1000 : nowMs + 31 * DAY_MS;
  const periodStartMs = sub.current_period_start ? sub.current_period_start * 1000 : null;
  const rawStatus = sub.status ?? "inactive";

  let status: "active" | "cancelled" | "inactive" = "inactive";
  if (rawStatus === "active" || rawStatus === "trialing") {
    status = sub.cancel_at_period_end ? "cancelled" : "active";
  } else if (rawStatus === "canceled") {
    status = periodEndMs > nowMs ? "cancelled" : "inactive";
  }

  return {
    status,
    valid_until: new Date(periodEndMs).toISOString(),
    ...(periodStartMs ? { period_start: new Date(periodStartMs).toISOString() } : {}),
    updated_at: nowIso,
  };
}

async function stripeRequest<T>(
  path: string,
  params?: Record<string, string>,
  method: "GET" | "POST" | "DELETE" = "POST",
): Promise<T> {
  const secretKey = process.env["STRIPE_SECRET_KEY"]?.trim();
  if (!secretKey) throw new Error("Stripe not configured");

  const headers: Record<string, string> = {
    Authorization: `Bearer ${secretKey}`,
  };
  let body: string | undefined;
  if (params && method === "POST") {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    body = new URLSearchParams(params).toString();
  }

  const response = await fetch(`${STRIPE_API}${path}`, {
    method,
    headers,
    ...(body ? { body } : {}),
  });
  const payload = (await response.json().catch(() => ({}))) as {
    error?: { message?: string };
  } & T;
  if (!response.ok) {
    throw new Error(payload.error?.message || `Stripe error (${response.status})`);
  }
  return payload;
}

export async function createCheckoutSession(input: {
  userId: string;
  email: string;
  tier: PaidTier;
  origin: string;
  customerId?: string | null;
}): Promise<{ id: string; url: string }> {
  const priceId =
    input.tier === "etudiant"
      ? process.env["STRIPE_PRICE_ETUDIANT"]?.trim()
      : process.env["STRIPE_PRICE_SPRINT"]?.trim();
  if (!priceId) throw new Error("Stripe price not configured");

  const params: Record<string, string> = {
    mode: input.tier === "etudiant" ? "subscription" : "payment",
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1",
    client_reference_id: input.userId,
    "metadata[user_id]": input.userId,
    "metadata[tier]": input.tier,
    allow_promotion_codes: "true",
    success_url: `${input.origin}/planes?pago=exito&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${input.origin}/planes?pago=cancelado`,
  };

  if (input.tier === "etudiant") {
    params["subscription_data[metadata][user_id]"] = input.userId;
    params["subscription_data[metadata][tier]"] = input.tier;
  } else {
    params["customer_creation"] = "always";
  }

  if (input.customerId) {
    params["customer"] = input.customerId;
  } else if (input.email) {
    params["customer_email"] = input.email;
  }

  const session = await stripeRequest<{ id: string; url: string | null }>(
    "/checkout/sessions",
    params,
    "POST",
  );
  if (!session.url) throw new Error("Stripe checkout URL missing");
  return { id: session.id, url: session.url };
}

export async function cancelStripeSubscriptionAtPeriodEnd(subscriptionId: string): Promise<void> {
  await stripeRequest(
    `/subscriptions/${encodeURIComponent(subscriptionId)}`,
    { cancel_at_period_end: "true" },
    "POST",
  );
}

export async function cancelStripeSubscriptionImmediately(subscriptionId: string): Promise<void> {
  await stripeRequest(`/subscriptions/${encodeURIComponent(subscriptionId)}`, undefined, "DELETE");
}
