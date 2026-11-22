import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const createStripeCheckout = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        tier: z.enum(["etudiant", "sprint"]),
        origin: z.string().url().max(300).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { createCheckoutSession, isStripeConfigured, resolveAppOrigin } = await import(
      "./stripe.server"
    );

    if (!isStripeConfigured()) {
      throw new Error("Stripe is not configured");
    }

    const origin = resolveAppOrigin(data.origin);
    const [authUser, ent] = await Promise.all([
      supabaseAdmin.auth.admin.getUserById(context.userId),
      supabaseAdmin
        .from("professor_entitlements")
        .select("stripe_customer_id")
        .eq("user_id", context.userId)
        .maybeSingle(),
    ]);

    const email = authUser.data?.user?.email ?? "";
    const customerId = ent.data?.stripe_customer_id ?? null;

    const session = await createCheckoutSession({
      userId: context.userId,
      email,
      tier: data.tier,
      origin,
      customerId,
    });
    return { url: session.url };
  });
