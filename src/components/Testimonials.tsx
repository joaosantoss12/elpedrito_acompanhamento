import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, ZoomIn, X, MessageCircle } from "lucide-react";

const testimonials = [
  {
    image: "/testemunho1.png",
    name: "R*** F***",
    tag: "Acompanhamento 3 Meses",
    text: "Em dois meses com o Pedrito já recuperei o investimento três vezes. A diferença do 1 para 1 é brutal.",
  },
  {
    image: "/testemunho2.png",
    name: "M*** C***",
    tag: "Acompanhamento 1 Mês",
    text: "Finalmente alguém que aposta a sério e me explica o porquê de cada jogada. Aprendi mais em 1 mês do que em 2 anos sozinho.",
  },
  {
    image: "/testemunho3.png",
    name: "D*** S***",
    tag: "Acompanhamento 1 Mês",
    text: "O acompanhamento é mesmo personalizado. Sinto que é mesmo 1 para 1 como ele promete.",
  },
  {
    image: "/testemunho4.png",
    name: "T*** A***",
    tag: "Acompanhamento 1 Mês",
    text: "Já tentei vários grupos VIP mas nunca senti esta atenção. Aqui és mesmo acompanhado, não só mais um número.",
  },
];

function ImageOrPlaceholder({ src, name, onClick }: { src: string | null; name: string; onClick: () => void }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="w-full h-48 rounded-xl bg-zinc-800/60 border border-white/5 flex flex-col items-center justify-center gap-2 mb-4">
        <MessageCircle className="w-8 h-8 text-zinc-600" />
        <span className="text-zinc-600 text-xs">Screenshot em breve</span>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-zinc-800/50 group/img cursor-zoom-in"
    >
      <img
        src={src}
        alt={`Testemunho de ${name}`}
        onError={() => setFailed(true)}
        className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <ZoomIn className="w-5 h-5 text-white" />
        </div>
      </div>
    </button>
  );
}

function Lightbox({ src, name, onClose }: { src: string; name: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{ transformPerspective: 1000 }}
          className="relative max-w-2xl w-full max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-700 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img src={src} alt={`Testemunho de ${name}`} className="w-full h-auto object-contain max-h-[85vh]" />
          </div>
          <p className="text-center text-zinc-500 text-xs mt-3">Clica fora para fechar</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightbox, setLightbox] = useState<{ src: string; name: string } | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const next = () => setCurrentIndex((prev) => (prev + 1) % totalPages);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  const currentTestimonials = testimonials.slice(currentIndex * itemsPerPage, currentIndex * itemsPerPage + itemsPerPage);

  return (
    <section ref={ref} className="relative py-14 sm:py-20 px-4 overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(34,197,94,0.04)_0%,_transparent_60%)] pointer-events-none"
      />

      {lightbox && <Lightbox src={lightbox.src} name={lightbox.name} onClose={() => setLightbox(null)} />}

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-4">
            Testemunhos
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
            O que dizem os{" "}
            <span className="gradient-text">meus clientes</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Resultados reais de pessoas reais.{" "}
            <span className="text-zinc-500 text-sm">Clica nas imagens para ampliar.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" style={{ perspective: 1400 }}>
          {currentTestimonials.map((t, i) => (
            <motion.div
              key={`${currentIndex}-${i}`}
              initial={{ opacity: 0, y: 60, rotateX: 20, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, rotateY: 3, scale: 1.02 }}
              className="group relative"
              style={{ transformPerspective: 900, willChange: "transform" }}
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative glass rounded-2xl p-6 h-full flex flex-col">
                <Quote className="w-8 h-8 text-gold/20 mb-4" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6 flex-grow">&ldquo;{t.text}&rdquo;</p>

                <ImageOrPlaceholder
                  src={t.image}
                  name={t.name}
                  onClick={() => t.image && setLightbox({ src: t.image, name: t.name })}
                />

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-black font-bold text-xs">
                    {t.name.charAt(t.name.length - 1)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-zinc-500 text-xs">{t.tag}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all duration-300">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-gold w-6" : "bg-zinc-600 hover:bg-zinc-400"}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all duration-300">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
