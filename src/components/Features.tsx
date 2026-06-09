import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { User, MessageCircle, BarChart3, TrendingUp, Clock, Target } from "lucide-react";

const features = [
  {
    icon: User,
    title: "Atenção Exclusiva",
    description: "Não és mais um num grupo. Tens acesso directo a mim — as minhas análises, o meu tempo e a minha atenção total focada em ti.",
  },
  {
    icon: MessageCircle,
    title: "Comunicação Directa",
    description: "Contacto directo comigo por WhatsApp ou Telegram. Podes fazer perguntas, pedir análises e receber resposta personalizada.",
  },
  {
    icon: BarChart3,
    title: "Gestão de Banca Dedicada",
    description: "Não apostas mais ao acaso. Definimos a tua banca, as unidades e a percentagem de risco adequada ao teu perfil.",
  },
  {
    icon: TrendingUp,
    title: "Tips em Tempo Real",
    description: "Recebes as minhas apostas no momento em que as faço, com análise completa: o porquê, as odds e o valor esperado.",
  },
  {
    icon: Clock,
    title: "Acompanhamento Diário",
    description: "Não desapareço após a subscrição. Estou presente todos os dias, analiso os resultados e adapto a estratégia continuamente.",
  },
  {
    icon: Target,
    title: "Estratégia Personalizada",
    description: "Cada cliente é diferente. A estratégia que desenvolvemos juntos é única para o teu perfil, objectivos e tolerância ao risco.",
  },
];

const counters = [
  { value: "100%", label: "Personalizado" },
  { value: "1:1", label: "Ratio tipster/cliente" },
  { value: "Diário", label: "Contacto garantido" },
  { value: "Real", label: "Transparência total" },
];

// Extracted so hooks are never called inside .map()
function CounterCard({ counter, index }: { counter: typeof counters[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 25 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="text-center glass rounded-2xl py-8 px-4 cursor-default"
      style={{ transformPerspective: 800, willChange: "transform" }}
    >
      <div className="text-3xl sm:text-4xl font-black gradient-text mb-2">{counter.value}</div>
      <div className="text-zinc-500 text-sm uppercase tracking-wider">{counter.label}</div>
    </motion.div>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: 20, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1200, willChange: "transform" }}
      className="group relative"
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <motion.div
        whileHover={{ rotateY: 3, rotateX: -3, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative glass rounded-2xl p-6 h-full card-hover"
        style={{ transformPerspective: 800 }}
      >
        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors duration-300">
          <feature.icon className="w-6 h-6 text-gold" />
        </div>
        <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
      </motion.div>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative py-14 sm:py-20 px-4 overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,83,0.03)_0%,_transparent_60%)] pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20" style={{ perspective: 1200 }}>
          {counters.map((counter, i) => (
            <CounterCard key={counter.label} counter={counter} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-4">
            Porquê Este Serviço
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
            O que torna este acompanhamento{" "}
            <span className="gradient-text">diferente</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Não és mais um cliente. Somos uma equipa — e o teu sucesso é o meu sucesso.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
