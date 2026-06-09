import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Zap, ArrowRight, X, AlertTriangle } from "lucide-react";


const plans = [
  {
    id: "monthly",
    name: "1 Mês",
    price: "149",
    originalPrice: "199",
    period: "pagamento único",
    description: "Acompanhamento completo durante 1 mês",
    features: [
      "Acompanhamento 1 para 1",
      "Tips diárias com análise",
      "Gestão de banca personalizada",
      "Contacto directo por mensagem",
      "Relatório semanal de resultados",
    ],
    icon: Zap,
    popular: true,
    gradient: "from-gold/10 to-gold/5",
    borderColor: "border-gold/30",
  },
];

type ModalStep = "warning" | null;

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [step, setStep] = useState<ModalStep>(null);
  const [loading, setLoading] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) ?? null;

  function openModal(planId: string) {
    setSelectedPlanId(planId);
    setStep("warning");
  }

  function closeModal() {
    setStep(null);
    setSelectedPlanId(null);
    setLoading(false);
  }

  async function handleCheckout() {
    if (!selectedPlan) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: selectedPlan.id }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error ?? "Erro ao iniciar pagamento. Tenta novamente.");
        setLoading(false);
      }
    } catch {
      alert("Erro de ligação. Verifica a tua internet e tenta novamente.");
      setLoading(false);
    }
  }

  return (
    <section id="pricing" ref={ref} className="relative py-14 sm:py-20 px-4 overflow-hidden">

      {/* ── STEP 1: Warning modal ── */}
      <AnimatePresence>
        {step === "warning" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 30, rotateX: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              style={{ transformPerspective: 1000 }}
              className="relative w-full max-w-sm rounded-2xl border border-amber-500/20 bg-zinc-900 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Antes de continuares</h3>
              </div>

              {/* Points */}
              <div className="space-y-2.5 mb-5">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/8">
                  <div className="w-6 h-6 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold font-bold text-[10px]">1</span>
                  </div>
                  <p className="text-zinc-300 text-xs leading-relaxed">
                    Após o pagamento serás redirecionado para o Telegram do Pedrito.
                  </p>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/[0.05] border border-amber-500/15">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-400 font-bold text-[10px]">2</span>
                  </div>
                  <p className="text-zinc-300 text-xs leading-relaxed">
                    O Stripe envia um recibo para o teu e-mail. Envia esse <span className="text-amber-300 font-semibold">comprovativo</span> ao Pedrito no Telegram para activar o acompanhamento.
                  </p>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/8">
                  <div className="w-6 h-6 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold font-bold text-[10px]">3</span>
                  </div>
                  <p className="text-zinc-300 text-xs leading-relaxed">
                    Se quiseres fatura, pede no Telegram após o pagamento.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <p className="text-zinc-500 text-xs text-center mb-5">
                Dúvidas ou problemas? <span className="text-gold">elpedritomembros@gmail.com</span>
              </p>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-gold-light text-black hover:opacity-90 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-wait shadow-lg shadow-gold/20"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    A processar...
                  </>
                ) : (
                  <>
                    Entendi, continuar
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-center text-zinc-600 text-xs mt-3">Clica fora para cancelar</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Background ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,168,83,0.06)_0%,_transparent_60%)] pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-4">
            Planos & Preços
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
            Escolhe o teu{" "}
            <span className="gradient-text">acompanhamento</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Pagamento único. Sem surpresas. Sem subscrições escondidas.
          </p>
        </motion.div>

        {/* Cards with 3D entrance */}
        <div className="flex justify-center" style={{ perspective: 1400 }}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 80, rotateX: 25, scale: 0.92 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, rotateY: plan.popular ? 0 : (i === 0 ? 3 : -3), scale: 1.02 }}
              className={`relative group ${plan.popular ? "md:-mt-4" : ""}`}
              style={{ transformPerspective: 1000 }}
            >
              {plan.popular && (
                <div className="absolute -inset-1 bg-gradient-to-b from-gold/30 via-gold/10 to-transparent rounded-3xl blur-sm" />
              )}
              <div
                className={`relative h-full rounded-2xl ${plan.popular ? "rounded-3xl" : ""} bg-gradient-to-b ${plan.gradient} border ${plan.borderColor} p-8 flex flex-col`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${plan.popular ? "bg-gold/20 text-gold" : "bg-white/5 text-zinc-400"}`}>
                  <plan.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-zinc-500 text-sm mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-white">€{plan.price}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-zinc-600 line-through text-sm">€{plan.originalPrice}</span>
                    <span className="text-xs text-green-accent font-semibold">
                      {Math.round((1 - parseFloat(plan.price) / parseFloat(plan.originalPrice)) * 100)}% OFF
                    </span>
                  </div>
                  <p className="text-zinc-500 text-xs mt-1">{plan.period}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-gold" : "text-green-accent"}`} />
                      <span className="text-zinc-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openModal(plan.id)}
                  className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                    plan.popular
                      ? "bg-gradient-to-r from-gold to-gold-light text-black hover:opacity-90 shadow-lg shadow-gold/20"
                      : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  Aderir Agora
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12 text-zinc-500 text-sm"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            Pagamento seguro via Stripe
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Encriptação SSL
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Activação imediata
          </div>
        </motion.div>
      </div>
    </section>
  );
}
