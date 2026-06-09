import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CreditCard, MessageCircle, BarChart2, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: CreditCard,
    title: "Escolhe o teu plano",
    description:
      "Selecciona o período que mais te convém e completa o pagamento de forma segura via Stripe. Acesso imediato após confirmação.",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Primeiro contacto",
    description:
      "Entras em contacto comigo directamente. Fazemos uma conversa inicial para perceber o teu perfil, objectivos e capital disponível.",
  },
  {
    number: "03",
    icon: BarChart2,
    title: "Definimos a estratégia",
    description:
      "Juntos definimos a tua banca, as unidades de aposta e a estratégia adaptada a ti. Tudo personalizado, nada genérico.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Apostamos juntos, dia a dia",
    description:
      "Recebes as minhas tips em tempo real, com análise de cada jogo. Acompanho os teus resultados e ajusto a estratégia conforme necessário.",
  },
];

function Step({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isRight = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isRight ? 60 : -60, rotateY: isRight ? 15 : -15 }}
      animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      className={`relative group ${isRight ? "lg:text-right lg:pr-16" : "lg:text-left lg:pl-16 lg:mt-20"}`}
    >
      <div className={`flex items-start gap-4 ${isRight ? "lg:flex-row-reverse" : ""}`}>
        <div className="flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.1, rotateZ: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300"
          >
            <step.icon className="w-6 h-6 text-gold" />
          </motion.div>
        </div>
        <div className="flex-1">
          <div className="text-gold/40 text-5xl font-black leading-none mb-2">{step.number}</div>
          <h3 className="text-white font-bold text-xl mb-2">{step.title}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">{step.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section id="como-funciona" ref={ref} className="relative py-14 sm:py-20 px-4 overflow-hidden">
      {/* Parallax background blob */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,83,0.04)_0%,_transparent_60%)] pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-4">
            Processo
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
            Como funciona o{" "}
            <span className="gradient-text">acompanhamento</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Quatro passos simples para começares a apostar com estratégia e com alguém do teu lado.
          </p>
        </motion.div>

        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
          {steps.map((step, i) => (
            <Step key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
