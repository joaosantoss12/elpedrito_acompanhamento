import { motion } from "framer-motion";
import { CheckCircle, Send, ExternalLink, AlertCircle } from "lucide-react";

export default function Success() {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");
  const paid = !!sessionId;

  if (!paid) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-8">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Algo correu <span className="text-red-400">mal</span>
          </h1>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            Não foi possível confirmar o pagamento. Se foste cobrado, contacta-nos imediatamente.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
          >
            ← Voltar ao início
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,83,0.06)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg w-full">
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="w-12 h-12 text-green-400" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl sm:text-5xl font-black text-white mb-4"
        >
          Pagamento{" "}
          <span className="gradient-text">Confirmado!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-zinc-400 text-lg mb-10 leading-relaxed"
        >
          O teu acesso ao acompanhamento está confirmado. Segue os passos abaixo para começarmos.
        </motion.p>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="glass rounded-2xl p-6 mb-8 text-left space-y-4"
        >
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-gold font-bold text-sm">1</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Verifica o teu e-mail</p>
              <p className="text-zinc-400 text-sm mt-0.5 leading-relaxed">
                O Stripe enviou automaticamente uma factura/recibo para o e-mail que introduziste no checkout. Guarda esse documento — é o teu <span className="text-white font-semibold">comprovativo de pagamento</span>.
              </p>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-gold font-bold text-sm">2</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Abre o Telegram e envia o comprovativo</p>
              <p className="text-zinc-400 text-sm mt-0.5 leading-relaxed">
                Envia o comprovativo de pagamento em mensagem directa para{" "}
                <span className="text-gold font-semibold">@elpedritoren</span> no Telegram. O acompanhamento começa após confirmação.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Telegram CTA */}
        <motion.a
          href="https://t.me/elpedritoren"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-gold to-gold-light text-black font-bold text-base hover:opacity-90 transition-all duration-300 shadow-lg shadow-gold/20 mb-6 glow-pulse"
        >
          <Send className="w-5 h-5" />
          Abrir Telegram — @elpedritoren
          <ExternalLink className="w-4 h-4 opacity-70" />
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="text-zinc-600 text-xs mb-8 leading-relaxed max-w-sm mx-auto"
        >
          Tens dúvidas? Envia também uma mensagem directa ao Pedrito no Telegram e ele responde em breve.
        </motion.p>

        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-300 text-sm"
        >
          ← Voltar ao início
        </motion.a>
      </div>
    </main>
  );
}
