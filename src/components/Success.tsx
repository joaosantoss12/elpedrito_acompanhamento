import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

const TELEGRAM_URL = `https://t.me/elpedritoren?text=${encodeURIComponent(
  "Pedrito, acabei de comprar o teu acompanhamento de 1 mês. Aqui está o meu comprovativo: [ANEXAR COMPROVATIVO DO EMAIL]"
)}`;

export default function Success() {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");
  const paid = !!sessionId;

  useEffect(() => {
    if (!paid) return;
    window.location.href = TELEGRAM_URL;
  }, [paid]);

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
    <main className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-zinc-400 text-sm">A redirecionar para o Telegram...</p>
      </div>
    </main>
  );
}
