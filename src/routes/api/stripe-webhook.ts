import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

type StripeEvent = {
  id: string;
  type: string;
  data: { object: Record<string, unknown> };
};

export const Route = createFileRoute("/api/stripe-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const webhookSecret = process.env["STRIPE_WEBHOOK_SECRET"]?.trim();
        if (!webhookSecret) {
          return Response.json({ error: "Webhook secret not configured" }, { status: 500 });
        }

        const rawBody = await request.text();
        const signature = request.headers.get("stripe-signature");
        const {
          entitlementFromCheckout,
          entitlementFromSubscription,
          verifyStripeSignature,
        } = await import("@/lib/stripe.server");

        const valid = await verifyStripeSignature(rawBody, signature, webhookSecret);
        if (!valid) {
          return Response.json({ error: "Invalid signature" }, { status: 400 });
        }

        let event: StripeEvent;
        try {
          event = JSON.parse(rawBody) as StripeEvent;
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        if (!event?.id || !event?.type || !event?.data?.object) {
          return Response.json({ error: "Malformed event" }, { status: 400 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Idempotencia: si Stripe reenvía el mismo evento, responder 200 sin duplicar cambios.
        const recorded = await supabaseAdmin
          .from("stripe_events")
          .insert({ event_id: event.id, type: event.type });
        if (recorded.error) {
          if (recorded.error.code === "23505") {
            return Response.json({ received: true, duplicate: true });
          }
          await supabaseAdmin.from("app_errors").insert({
            source: "stripe-webhook",
            status: 500,
            message: `stripe_events insert failed: ${recorded.error.message}`.slice(0, 500),
          });
          return Response.json({ error: "Event log failed" }, { status: 500 });
        }

        try {
          if (event.type === "checkout.session.completed") {
            const payload = entitlementFromCheckout(event.data.object as never);
            if (payload) {
              const { error } = await supabaseAdmin
                .from("professor_entitlements")
                .upsert(payload, { onConflict: "user_id" });
              if (error) throw error;
            }
          } else if (event.type === "invoice.paid") {
            const invoice = event.data.object as {
              subscription?: string | null;
              customer?: string | null;
              lines?: { data?: Array<{ period?: { start?: number; end?: number } }> };
            };
            const subId = typeof invoice.subscription === "string" ? invoice.subscription : null;
            if (subId) {
              const linePeriod = invoice.lines?.data?.[0]?.period;
              const nowIso = new Date().toISOString();
              const periodStart = linePeriod?.start
                ? new Date(linePeriod.start * 1000).toISOString()
                : nowIso;
              const validUntil = linePeriod?.end
                ? new Date(linePeriod.end * 1000).toISOString()
                : new Date(Date.now() + 31 * 86_400_000).toISOString();
              const { error } = await supabaseAdmin
                .from("professor_entitlements")
                .update({
                  status: "active",
                  period_start: periodStart,
                  valid_until: validUntil,
                  updated_at: nowIso,
                })
                .eq("stripe_subscription_id", subId);
              if (error) throw error;
            }
          } else if (event.type === "customer.subscription.updated") {
            const sub = event.data.object as { id?: string };
            if (sub.id) {
              const patch = entitlementFromSubscription(sub as never);
              const { error } = await supabaseAdmin
                .from("professor_entitlements")
                .update(patch)
                .eq("stripe_subscription_id", sub.id);
              if (error) throw error;
            }
          } else if (event.type === "customer.subscription.deleted") {
            const sub = event.data.object as { id?: string };
            if (sub.id) {
              const nowIso = new Date().toISOString();
              const { error } = await supabaseAdmin
                .from("professor_entitlements")
                .update({ status: "inactive", valid_until: nowIso, updated_at: nowIso })
                .eq("stripe_subscription_id", sub.id);
              if (error) throw error;
            }
          }
        } catch (err) {
          const message = err instanceof Error ? err.message : "Webhook processing failed";
          await supabaseAdmin.from("app_errors").insert({
            source: "stripe-webhook",
            status: 500,
            message: `${event.type}: ${message}`.slice(0, 500),
          });
          // Permitir reintento de Stripe eliminando el registro de idempotencia fallido.
          await supabaseAdmin.from("stripe_events").delete().eq("event_id", event.id);
          return Response.json({ error: "Processing error" }, { status: 500 });
        }

        return Response.json({ received: true });
      },
    },
  },
});
