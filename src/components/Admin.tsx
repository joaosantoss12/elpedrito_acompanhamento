import { useState, useEffect } from "react";
import { Lock, LogOut, RefreshCw, TrendingUp, Users, Euro } from "lucide-react";

type Purchase = {
  id: string;
  email: string;
  plan: string;
  amount: string;
  paymentMethod: string;
  date: string;
};

const SESSION_KEY = "admin_auth";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem(SESSION_KEY));
  const [error, setError] = useState("");
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  async function fetchPurchases(pwd: string) {
    setLoading(true);
    setFetchError("");
    try {
      const res = await fetch("/api/admin", {
        headers: { "x-admin-password": pwd },
      });
      const data = await res.json();
      if (!res.ok) {
        setFetchError(data.error ?? "Erro ao carregar dados.");
      } else {
        setPurchases(data.purchases);
      }
    } catch {
      setFetchError("Erro de ligação.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin", {
      headers: { "x-admin-password": password },
    });
    if (res.status === 401) {
      setError("Palavra-passe incorrecta.");
      return;
    }
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Erro.");
      return;
    }
    sessionStorage.setItem(SESSION_KEY, password);
    setPurchases(data.purchases);
    setAuthed(true);
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setPassword("");
    setPurchases([]);
  }

  useEffect(() => {
    if (authed) {
      const stored = sessionStorage.getItem(SESSION_KEY)!;
      fetchPurchases(stored);
    }
  }, [authed]);

  const totalRevenue = purchases.reduce((sum, p) => {
    const val = parseFloat(p.amount.replace("€", "")) || 0;
    return sum + val;
  }, 0);

  if (!authed) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-gold" />
            </div>
            <h1 className="text-2xl font-black text-white">Área Restrita</h1>
            <p className="text-zinc-500 text-sm mt-1">Pedrito Acompanhamento — Admin</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Palavra-passe"
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-gold/50 transition-colors text-sm"
            />
            {error && <p className="text-red-400 text-xs text-center">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-gold to-gold-light text-black font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Entrar
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-white">Painel Admin</h1>
            <p className="text-zinc-500 text-sm">Compras registadas via Stripe</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => fetchPurchases(sessionStorage.getItem(SESSION_KEY)!)}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-all text-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Actualizar
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{purchases.length}</p>
              <p className="text-zinc-500 text-xs uppercase tracking-wider">Clientes</p>
            </div>
          </div>
          <div className="glass rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-accent/10 flex items-center justify-center">
              <Euro className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">€{totalRevenue.toFixed(2)}</p>
              <p className="text-zinc-500 text-xs uppercase tracking-wider">Receita Total</p>
            </div>
          </div>
          <div className="glass rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">
                €{purchases.length ? (totalRevenue / purchases.length).toFixed(2) : "0.00"}
              </p>
              <p className="text-zinc-500 text-xs uppercase tracking-wider">Ticket Médio</p>
            </div>
          </div>
        </div>

        {/* Table */}
        {fetchError ? (
          <p className="text-red-400 text-sm text-center py-10">{fetchError}</p>
        ) : loading ? (
          <div className="flex justify-center py-20">
            <svg className="animate-spin w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : purchases.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-zinc-500">Ainda não há compras registadas.</p>
          </div>
        ) : (
          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-6 py-4 text-zinc-500 font-semibold uppercase tracking-wider text-xs">Data</th>
                    <th className="text-left px-6 py-4 text-zinc-500 font-semibold uppercase tracking-wider text-xs">Email</th>
                    <th className="text-left px-6 py-4 text-zinc-500 font-semibold uppercase tracking-wider text-xs">Plano</th>
                    <th className="text-left px-6 py-4 text-zinc-500 font-semibold uppercase tracking-wider text-xs">Valor</th>
                    <th className="text-left px-6 py-4 text-zinc-500 font-semibold uppercase tracking-wider text-xs">Método</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((p, i) => (
                    <tr key={p.id} className={`border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                      <td className="px-6 py-4 text-zinc-400 whitespace-nowrap">{p.date}</td>
                      <td className="px-6 py-4 text-white">{p.email}</td>
                      <td className="px-6 py-4 text-zinc-300">{p.plan}</td>
                      <td className="px-6 py-4 text-gold font-semibold">{p.amount}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-400 text-xs capitalize">
                          {p.paymentMethod}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
