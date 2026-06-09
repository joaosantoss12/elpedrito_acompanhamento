import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap } from "lucide-react";

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const cardScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const cardRotateX = useTransform(scrollYProgress, [0, 0.5], [12, 0]);

  return (
    <section ref={ref} className="relative py-14 sm:py-20 px-4 overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,83,0.08)_0%,_transparent_50%)] pointer-events-none"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          style={{ scale: cardScale, rotateX: cardRotateX, transformPerspective: 1200 }}
          className="glass rounded-3xl p-12 sm:p-16 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6"
          >
            Pronto para apostar com{" "}
            <span className="gradient-text">alguém do teu lado</span>?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-zinc-400 text-lg mb-10 max-w-lg mx-auto"
          >
            As vagas são limitadas propositadamente — para garantir que cada cliente recebe a atenção que merece.
            Não percas o teu lugar.
          </motion.p>

          <motion.a
            href="#pricing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-gold to-gold-light text-black font-bold text-lg rounded-full overflow-hidden glow-pulse"
          >
            <span className="relative z-10">Quero o Meu Lugar</span>
            <Zap className="relative z-10 w-5 h-5" />
            <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-zinc-600 text-xs mt-6"
          >
            Vagas limitadas · Pagamento único · Acompanhamento imediato
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
