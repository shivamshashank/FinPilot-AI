import { useApp } from '../components/AppContext';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  MessageSquareText,
  Receipt,
  DollarSign
} from 'lucide-react';
import { useState } from 'react';
import { FAQ_ITEMS } from '../mockData';
import { motion } from 'motion/react';

export default function LandingPage() {
  const { setAuthStep } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const features = [
    {
      icon: Zap,
      title: "Real-time Aggregation",
      description: "Connect multi-institution bank accounts, checking pools, and credit cards instantly under a unified workspace.",
      color: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-950/20"
    },
    {
      icon: MessageSquareText,
      title: "FinPilot AI Assistant",
      description: "Conversational co-pilot trained in private wealth frameworks to optimize savings rates and answer budget queries.",
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-950/20"
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Smart projection models mapping cash flow, category velocity, and forecasting net worth horizons up to 12 months.",
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/20"
    },
    {
      icon: Receipt,
      title: "Receipt OCR & Parsing",
      description: "Drag-and-drop receipt or invoice uploads to extract tax-deductible categories and match transaction logs automatically.",
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-950/20"
    },
    {
      icon: PiggyBank,
      title: "Adaptive Budgets",
      description: "Flexible boundaries that recalibrate automatically when supplemental freelancing or investment dividends are credited.",
      color: "text-pink-500",
      bg: "bg-pink-50 dark:bg-pink-950/20"
    },
    {
      icon: ShieldCheck,
      title: "Bank-Grade Encryption",
      description: "End-to-end read-only connections with AES-256 data standards. We protect your privacy like our own.",
      color: "text-cyan-500",
      bg: "bg-cyan-50 dark:bg-cyan-950/20"
    }
  ];

  const testimonials = [
    {
      quote: "FinPilot AI completely replaced my manual Google Sheets tracker. The AI assistant identified $120 of duplicate SaaS subscriptions in under 10 seconds.",
      author: "Marcus Vance",
      role: "Lead Designer at Vercel",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
    },
    {
      quote: "The interface is beautiful. It feels like an extension of Apple or Stripe. The budget optimization recommendations helped me secure an extra $600 of emergency funds.",
      author: "Elena Rostova",
      role: "Software Architect at Linear",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
    }
  ];

  // Helper inside layout
  function PiggyBank({ className }: { className?: string }) {
    return <DollarSign className={className} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 selection:bg-indigo-500 selection:text-white" id="landing-page">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md border-b border-gray-200/50 dark:border-zinc-900/50" id="landing-header">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/10">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold tracking-tight text-gray-900 dark:text-white text-base">FinPilot AI</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-zinc-400">
            <a href="#features" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Features</a>
            <a href="#faq" className="hover:text-zinc-900 dark:hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-4">
            <button
              id="landing-signin-btn"
              onClick={() => setAuthStep('signin')}
              className="text-sm font-medium text-gray-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              id="landing-getstarted-btn"
              onClick={() => setAuthStep('signin')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 md:pt-28 md:pb-36 overflow-hidden max-w-7xl mx-auto px-6" id="landing-hero">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-pink-500/5 dark:bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto relative z-10">
          {/* Tag badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/50 dark:border-indigo-500/20 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-8" id="hero-badge">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>Introducing FinPilot Pro 2026 Engine</span>
          </div>

          <h1 className="font-sans font-extrabold text-4xl md:text-6xl tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-6">
            Your personal wealth, <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">guided by artificial intelligence.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 dark:text-zinc-400 font-sans leading-relaxed max-w-2xl mx-auto mb-10">
            A premium personal finance platform that syncs with your accounts, monitors budgets, organizes receipts, and generates intelligent saving plans.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-primary-btn"
              onClick={() => setAuthStep('signin')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-xl shadow-indigo-600/10 hover:shadow-indigo-600/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer text-base"
            >
              Get Started <ArrowRight className="h-5 w-5" />
            </button>
            <a
              id="hero-secondary-btn"
              href="#features"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-850 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300 font-medium transition-all text-center"
            >
              Explore Features
            </a>
          </div>
        </div>

        {/* Dashboard Mockup Showcase */}
        <div className="mt-16 md:mt-24 border border-gray-200/60 dark:border-zinc-800/80 rounded-3xl p-3 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md shadow-2xl relative" id="landing-showcase">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-zinc-950 via-transparent to-transparent z-10 pointer-events-none" />
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200/30 dark:border-zinc-800/50 h-[350px] md:h-[500px] overflow-hidden relative flex flex-col justify-start">
            {/* Mock Dashboard header */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800/80 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <div className="h-32 w-1 bg-transparent" />
                <span className="text-xs font-mono text-gray-400 dark:text-zinc-500">finpilot.ai/app/dashboard</span>
              </div>
              <div className="h-2 w-20 bg-gray-200 dark:bg-zinc-800 rounded-full" />
            </div>

            {/* Mock Dashboard body */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 opacity-90">
              <div className="bg-slate-50 dark:bg-zinc-950/60 p-6 rounded-2xl border border-gray-200/50 dark:border-zinc-800/60 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-gray-400 dark:text-zinc-500 font-mono">NET PORTFOLIO</span>
                  <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mt-2">$46,250.00</h3>
                </div>
                <div className="h-16 bg-indigo-500/10 rounded-xl border border-indigo-500/10 flex items-center justify-center">
                  <span className="text-xs font-semibold text-indigo-500 font-mono">PORTFOLIO GAIN: +12.4%</span>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-zinc-950/60 p-6 rounded-2xl border border-gray-200/50 dark:border-zinc-800/60 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-gray-400 dark:text-zinc-500 font-mono">SPENDING VELOCITY</span>
                  <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mt-2">$3,163.40</h3>
                </div>
                <div className="h-16 bg-pink-500/10 rounded-xl border border-pink-500/10 flex items-center justify-center">
                  <span className="text-xs font-semibold text-pink-500 font-mono">BUDGETS MET: 94%</span>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-zinc-950/60 p-6 rounded-2xl border border-gray-200/50 dark:border-zinc-800/60 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-gray-400 dark:text-zinc-500 font-mono">FINANCIAL HEALTH</span>
                  <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mt-2">82 / 100</h3>
                </div>
                <div className="h-16 bg-emerald-500/10 rounded-xl border border-emerald-500/10 flex items-center justify-center">
                  <span className="text-xs font-semibold text-emerald-500 font-mono">HEALTH GRADE: STABLE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-zinc-900/40 border-y border-gray-200/40 dark:border-zinc-900/60" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-gray-900 dark:text-white tracking-tight mb-4">
              Everything you need to optimize your capital.
            </h2>
            <p className="text-gray-500 dark:text-zinc-400 text-base">
              Say goodbye to manual tracking and fragmented bank tools. FinPilot connects the dots and offers private wealth guidance in a single screen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  id={`feature-card-${idx}`}
                  key={idx}
                  className="bg-slate-50 dark:bg-zinc-900/50 p-8 rounded-2xl border border-gray-200/50 dark:border-zinc-800/50 hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`h-11 w-11 rounded-xl ${feat.bg} flex items-center justify-center mb-6`}>
                    <Icon className={`h-5 w-5 ${feat.color}`} />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-gray-900 dark:text-white mb-2">{feat.title}</h3>
                  <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* FAQ Accordion Section */}
      <section className="py-24 max-w-3xl mx-auto px-6" id="faq">
        <h2 className="font-sans font-bold text-2xl text-center text-gray-900 dark:text-white tracking-tight mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                id={`faq-item-${idx}`}
                key={idx}
                className="border border-gray-250/50 dark:border-zinc-800/80 rounded-2xl bg-white dark:bg-zinc-900/30 overflow-hidden transition-all"
              >
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-semibold text-gray-800 dark:text-zinc-200 hover:text-indigo-500 dark:hover:text-indigo-400 font-sans text-sm cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-gray-500 dark:text-zinc-400 leading-relaxed font-sans border-t border-gray-100 dark:border-zinc-900">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-zinc-950 text-white text-center px-6 border-t border-indigo-950/40" id="landing-cta">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Start taking control of your financial destiny today.</h2>
          <p className="text-zinc-300 text-base mb-8 max-w-xl mx-auto">Join thousands of high-performing engineers, designers, and entrepreneurs optimizing their budgets with artificial intelligence.</p>
          <button
            id="cta-getstarted-btn"
            onClick={() => setAuthStep('signin')}
            className="px-8 py-4 bg-white text-indigo-950 font-bold rounded-2xl hover:bg-zinc-100 shadow-xl shadow-indigo-950/20 hover:-translate-y-0.5 transition-all flex items-center gap-2 mx-auto cursor-pointer"
          >
            Create Your Account <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-zinc-950 py-12 px-6 border-t border-gray-200/50 dark:border-zinc-900/60" id="landing-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500 dark:text-zinc-500">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center">
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="font-sans font-bold text-gray-900 dark:text-white">FinPilot AI</span>
          </div>
          <p>© 2026 FinPilot AI, Inc. All rights reserved. Bank services are provided by Evolve Bank & Trust, Members FDIC.</p>
          <div className="flex items-center gap-6">
            <button id="footer-terms" onClick={() => setAuthStep('signin')} className="hover:text-indigo-500 transition-colors cursor-pointer">Terms</button>
            <button id="footer-privacy" onClick={() => setAuthStep('signin')} className="hover:text-indigo-500 transition-colors cursor-pointer">Privacy</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
