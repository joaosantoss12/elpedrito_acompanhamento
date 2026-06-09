import { useScroll, useSpring, motion } from 'framer-motion'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Success from './components/Success'

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-gold-light to-gold z-[100]"
    />
  )
}

const isSuccessPage = window.location.pathname === '/sucesso' || window.location.pathname === '/sucesso/'

export default function App() {
  if (isSuccessPage) {
    return <Success />
  }

  return (
    <>
      <ScrollProgressBar />
      <main className="min-h-screen bg-[#050505] overflow-x-hidden selection:bg-gold/30 selection:text-gold-light noise relative">
        <Hero />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        <HowItWorks />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <Features />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        <Pricing />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        <Testimonials />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <FAQ />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        <FinalCTA />
        <footer className="relative z-10 bg-[#050505] py-12 px-4 border-t border-white/5 text-center text-zinc-500 text-sm">
          <p className="gradient-text font-bold text-lg mb-2">Pedrito Acompanhamento</p>
          <p className="text-zinc-600">© 2026 Pedrito Acompanhamento. Todos os direitos reservados.</p>
          <p className="mt-4 text-xs opacity-60 max-w-xl mx-auto leading-relaxed">
            Apostas desportivas envolvem risco financeiro. Aposta de forma responsável e apenas com dinheiro que
            podes perder. Este serviço destina-se apenas a maiores de 18 anos.
            Resultados passados não garantem resultados futuros.
          </p>
        </footer>
      </main>
    </>
  )
}
