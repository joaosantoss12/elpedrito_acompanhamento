import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const password = req.headers["x-admin-password"];
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-03-25.dahlia" as any,
    });

    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      status: "complete",
    });

    const purchases = sessions.data
      .filter((s) => s.metadata?.planName === "Pedrito Acompanhamento — 1 Mês")
      .map((s) => ({
        id: s.id,
        email: s.customer_details?.email ?? "—",
        plan: s.metadata?.planName ?? "—",
        amount: s.amount_total != null ? `€${(s.amount_total / 100).toFixed(2)}` : "—",
        paymentMethod: s.payment_method_types.join(", "),
        date: new Date(s.created * 1000).toLocaleString("pt-PT", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

    return res.json({ purchases });
  } catch (err) {
    console.error("Admin fetch error:", err);
    return res.status(500).json({ error: "Erro ao obter dados" });
  }
}
