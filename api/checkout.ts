import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const PLANS: Record<string, { name: string; amount: number }> = {
  monthly: {
    name: "Pedrito Acompanhamento — 1 Mês",
    amount: 10000,
  },
  quarterly: {
    name: "Pedrito Acompanhamento — 3 Meses",
    amount: 34900,
  },
  biannual: {
    name: "Pedrito Acompanhamento — 6 Meses",
    amount: 59900,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-03-25.dahlia" as any,
    });

    const body = req.body;
    const planId = typeof body?.planId === "string" ? body.planId : null;

    if (!planId || !PLANS[planId]) {
      return res.status(400).json({ error: "Plano inválido" });
    }

    const plan = PLANS[planId];
    const baseUrl =
      process.env.VITE_PUBLIC_URL ||
      `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "mb_way"],
      billing_address_collection: "auto",
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: plan.amount,
            product_data: { name: plan.name },
          },
          quantity: 1,
        },
      ],
      metadata: {
        planId,
        planName: plan.name,
      },
      success_url: `${baseUrl}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/#pricing`,
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return res
      .status(500)
      .json({ error: "Erro ao criar sessão de pagamento" });
  }
}
