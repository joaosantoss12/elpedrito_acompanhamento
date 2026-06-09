import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "O que é exactamente o acompanhamento 1 para 1?",
    answer: "É um serviço completamente personalizado onde trabalho directamente contigo — só tu e eu. Não és parte de um grupo genérico. Analisamos a tua situação, definimos a tua banca e estratégia, e apostamos juntos com comunicação directa e diária.",
  },
  {
    question: "Como é feita a comunicação?",
    answer: "Comunico directamente contigo por WhatsApp ou Telegram — o que preferires. Recebes as minhas tips em tempo real, com análise do jogo, as odds recomendadas e a gestão da tua unidade de aposta.",
  },
  {
    question: "Preciso de ter experiência em apostas?",
    answer: "Não é necessário. O objectivo do acompanhamento é exactamente esse — aprender enquanto apostas. Se és iniciante, começamos do zero e construímos a tua estratégia de raiz. Se já tens experiência, optimizamos o que já fazias.",
  },
  {
    question: "O pagamento é único? Sem renovação automática?",
    answer: "Sim, pagamento único. Pagas o período que escolhes (1, 3 ou 6 meses) e não existe qualquer renovação automática. Quando terminar, se quiseres continuar, renova manualmente.",
  },
  {
    question: "Quantas apostas recebo por dia?",
    answer: "Depende do dia e dos jogos disponíveis. Em média entre 1 a 3 apostas diárias, sempre com análise e justificação. Prefiro qualidade a quantidade — só envio quando há valor real na aposta.",
  },
  {
    question: "Em que modalidades desportivas apostas?",
    answer: "Principalmente futebol, mas também basquetebol e ténis dependendo da época. No início do acompanhamento percebemos juntos em que modalidades faz mais sentido apostar de acordo com o teu perfil.",
  },
  {
    question: "E se não tiver os resultados esperados?",
    answer: "As apostas têm variância — isso é normal e honesto. O que garanto é total transparência: partilho todos os resultados, bons e maus. A estratégia a longo prazo é o que diferencia quem lucra de quem perde.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative py-14 sm:py-20 px-4 overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(212,168,83,0.04)_0%,_transparent_60%)] pointer-events-none"
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-4">
            Dúvidas Frequentes
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
            Perguntas{" "}
            <span className="gradient-text">frequentes</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30, rotateY: -8 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformPerspective: 800 }}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors duration-200"
              >
                <span className="text-white font-semibold text-sm sm:text-base pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-zinc-400 flex-shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="px-5 pb-5 mt-3 text-zinc-400 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
