import { describe, expect, test } from "bun:test";
import {
  entitlementFromCheckout,
  entitlementFromSubscription,
  isStripeConfigured,
  resolveAppOrigin,
  verifyStripeSignature,
} from "./stripe.server";

async function sign(secret, timestamp, body) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(`${timestamp}.${body}`));
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `t=${timestamp},v1=${hex}`;
}

describe("Stripe webhook signature verification", () => {
  test("accepts valid HMAC-SHA256 signature within tolerance", async () => {
    const secret = "whsec_test_123456";
    const body = '{"id":"evt_1","type":"checkout.session.completed"}';
    const now = 1_700_000_000;
    const header = await sign(secret, now - 10, body);
    expect(await verifyStripeSignature(body, header, secret, now)).toBe(true);
  });

  test("rejects tampered payload or wrong secret", async () => {
    const secret = "whsec_test_123456";
    const body = '{"id":"evt_1"}';
    const now = 1_700_000_000;
    const header = await sign(secret, now, body);
    expect(await verifyStripeSignature('{"id":"evt_2"}', header, secret, now)).toBe(false);
    expect(await verifyStripeSignature(body, header, "whsec_other", now)).toBe(false);
  });

  test("rejects replayed signature older than 5 minutes", async () => {
    const secret = "whsec_test_123456";
    const body = '{"id":"evt_1"}';
    const now = 1_700_000_000;
    const header = await sign(secret, now - 400, body);
    expect(await verifyStripeSignature(body, header, secret, now)).toBe(false);
  });
});

describe("Stripe checkout & subscription entitlement mapping", () => {
  test("activates Étudiant monthly subscription with customer and subscription IDs", () => {
    const now = Date.parse("2026-11-22T00:00:00Z");
    const ent = entitlementFromCheckout(
      {
        id: "cs_test_1",
        mode: "subscription",
        payment_status: "paid",
        customer: "cus_123",
        subscription: "sub_456",
        metadata: { user_id: "user-1", tier: "etudiant" },
      },
      now,
    );
    expect(ent?.tier).toBe("etudiant");
    expect(ent?.plan).toBe("monthly");
    expect(ent?.status).toBe("active");
    expect(ent?.stripe_customer_id).toBe("cus_123");
    expect(ent?.stripe_subscription_id).toBe("sub_456");
  });

  test("activates Sprint ÉUF one-time payment for exactly 60 days", () => {
    const now = Date.parse("2026-11-22T00:00:00Z");
    const ent = entitlementFromCheckout(
      {
        id: "cs_test_2",
        mode: "payment",
        payment_status: "paid",
        customer: "cus_789",
        metadata: { user_id: "user-2", tier: "sprint" },
      },
      now,
    );
    expect(ent?.tier).toBe("sprint");
    expect(ent?.plan).toBe("one_time");
    expect(ent?.status).toBe("active");
    expect(ent?.stripe_subscription_id).toBeNull();
    expect(Date.parse(ent.valid_until) - now).toBe(60 * 86_400_000);
  });

  test("ignores unpaid Sprint sessions", () => {
    const ent = entitlementFromCheckout({
      id: "cs_unpaid",
      mode: "payment",
      payment_status: "unpaid",
      metadata: { user_id: "user-2", tier: "sprint" },
    });
    expect(ent).toBeNull();
  });

  test("maps cancel_at_period_end subscription to cancelled while preserving valid_until", () => {
    const now = Date.parse("2026-11-22T00:00:00Z");
    const endSec = Math.floor(Date.parse("2026-12-22T00:00:00Z") / 1000);
    const patch = entitlementFromSubscription(
      {
        id: "sub_456",
        status: "active",
        cancel_at_period_end: true,
        current_period_end: endSec,
      },
      now,
    );
    expect(patch.status).toBe("cancelled");
    expect(patch.valid_until).toBe("2026-12-22T00:00:00.000Z");
  });
});

describe("Stripe configuration & origin safety", () => {
  test("requires secret key and both price IDs", () => {
    expect(isStripeConfigured({})).toBe(false);
    expect(
      isStripeConfigured({
        STRIPE_SECRET_KEY: "sk_test_1",
        STRIPE_PRICE_ETUDIANT: "price_1",
        STRIPE_PRICE_SPRINT: "price_2",
      }),
    ).toBe(true);
  });

  test("accepts HTTPS and localhost origins and rejects unsafe protocols", () => {
    expect(resolveAppOrigin("https://euf-pro.vercel.app/planes", {})).toBe(
      "https://euf-pro.vercel.app",
    );
    expect(resolveAppOrigin("http://localhost:8080/planes", {})).toBe("http://localhost:8080");
    expect(() => resolveAppOrigin("javascript:alert(1)", {})).toThrow();
  });
});
