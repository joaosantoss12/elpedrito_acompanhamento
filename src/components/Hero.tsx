import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, Shield, Users, ChevronDown, Zap } from "lucide-react";

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }[] = [];

    const stars: {
      x: number; y: number; size: number;
      baseOpacity: number; opacity: number;
      twinkleSpeed: number; twinkleOffset: number;
      glow?: boolean; color?: string;
      vx?: number; vy?: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#d4a853", "#f0d78c", "#22c55e", "#ffffff"];
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const starColors = ["#ffffff", "#ffffff", "#ffffff", "#ffe8a0", "#d4f0ff"];
    for (let i = 0; i < 180; i++) {
      const base = Math.random() * 0.7 + 0.2;
      const isBright = Math.random() < 0.1;
      const isDrifting = Math.random() < 0.2;
      const speed = Math.random() * 0.06 + 0.005;
      const angle = Math.random() * Math.PI * 2;
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: isBright ? Math.random() * 2 + 1 : Math.random() * 1 + 0.3,
        baseOpacity: isBright ? base * 1.2 : base,
        opacity: base,
        twinkleSpeed: Math.random() * 0.015 + 0.003,
        twinkleOffset: Math.random() * Math.PI * 2,
        glow: isBright,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        vx: isDrifting ? Math.cos(angle) * speed : 0,
        vy: isDrifting ? Math.sin(angle) * speed : 0,
      });
    }

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      stars.forEach((s) => {
        if (s.vx || s.vy) {
          s.x += s.vx!; s.y += s.vy!;
          if (s.x < 0) s.x = canvas.width;
          if (s.x > canvas.width) s.x = 0;
          if (s.y < 0) s.y = canvas.height;
          if (s.y > canvas.height) s.y = 0;
        }
        s.opacity = s.baseOpacity + Math.sin(frame * s.twinkleSpeed + s.twinkleOffset) * (s.baseOpacity * 0.7);
        const alpha = Math.max(0, Math.min(1, s.opacity));
        if (s.glow) { ctx.shadowBlur = 8; ctx.shadowColor = s.color ?? "#ffffff"; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color ?? "#ffffff";
        ctx.globalAlpha = alpha;
        ctx.fill();
        if (s.glow) { ctx.shadowBlur = 0; ctx.shadowColor = "transparent"; }
      });

      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => { cancelAnimationFrame(animationId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />;
}

const stats = [
  { value: "1 para 1", label: "Acompanhamento", icon: Users },
  { value: "ROI+", label: "Resultados Reais", icon: TrendingUp },
  { value: "Diário", label: "Tips & Análises", icon: Shield },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Parallax at different depths — creates 3D layering effect
  const contentY = useTransform(scrollY, [0, 600], [0, -120]);
  const ringsY = useTransform(scrollY, [0, 600], [0, -60]);
  const canvasY = useTransform(scrollY, [0, 600], [0, -30]);
  const statsY = useTransform(scrollY, [0, 600], [0, -160]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,168,83,0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(34,197,94,0.05)_0%,_transparent_50%)]" />

      {/* Particles — slowest layer (background) */}
      <motion.div style={{ y: canvasY }} className="absolute inset-0">
        <ParticleField />
      </motion.div>

      {/* Rings — middle layer */}
      <motion.div style={{ y: ringsY, zIndex: 1 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-gold/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-green-accent/5"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Content — fastest layer (foreground) */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-zinc-300 tracking-wide uppercase">
            Vagas Muito Limitadas — Acompanhamento Exclusivo
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-6"
        >
          <span className="block text-white">O teu gestor de</span>
          <span className="block gradient-text mt-2">apostas pessoal</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Acompanhamento{" "}
          <span className="text-white font-semibold">1 para 1</span>{" "}
          completamente personalizado. Apostamos juntos, analiso cada jogada,
          giro a tua banca — e crescemos juntos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <a
            href="#pricing"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-black font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 glow-pulse"
          >
            <span className="relative z-10">Quero o Meu Lugar</span>
            <Zap className="relative z-10 w-5 h-5" />
            <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#como-funciona"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-zinc-300 hover:text-white hover:border-white/30 transition-all duration-300"
          >
            <span>Como Funciona</span>
            <span className="text-xl">↓</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Stats — deepest foreground layer */}
      <motion.div
        style={{ y: statsY, opacity }}
        className="absolute bottom-20 left-0 right-0 z-10 flex flex-wrap justify-center gap-8 sm:gap-16 px-4"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 + i * 0.15 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
              <stat.icon className="w-5 h-5 text-gold" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-zinc-600" />
      </motion.div>
    </section>
  );
}
