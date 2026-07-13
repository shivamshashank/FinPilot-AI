import { useApp } from '../components/AppContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Sparkles, 
  Receipt, 
  ArrowRight,
  ShieldCheck,
  Percent,
  Plus,
  Coins
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_CHART_MONTHLY } from '../mockData';
import { motion } from 'motion/react';

export default function Dashboard() {
  const { 
    userProfile, 
    transactions, 
    budgets, 
    savingsGoals, 
    setCurrentView,
    alerts 
  } = useApp();

  // Financial computations
  const totalIncome = transactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  // Active savings sum
  const totalSaved = savingsGoals.reduce((sum, g) => sum + g.current, 0);

  // Recent transactions (last 4)
  const recentTx = transactions.slice(0, 4);

  // Time-based Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Quick Action triggers
  const handleQuickAiOptimize = () => {
    setCurrentView('assistant');
  };

  return (
    <div className="space-y-6" id="dashboard-page">
      {/* Welcome Card banner */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-950 to-zinc-950 text-white rounded-3xl p-6 border border-indigo-900/40 shadow-xl"
        id="dashboard-welcome-banner"
      >
        <div className="absolute top-[-40%] right-[-10%] w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 rounded-full bg-pink-500/10 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] text-indigo-400 font-mono tracking-widest font-semibold uppercase">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>FinPilot AI Assistant Active</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight mt-2">{getGreeting()}, {userProfile.name.split(' ')[0]}</h1>
            <p className="text-xs text-indigo-200 mt-1 max-w-lg leading-relaxed">
              Your overall Wealth Score is **{userProfile.financialScore}/100**. FinPilot has run optimizations and located **$45.00** of potential monthly subscription recoveries.
            </p>
          </div>
          <button
            id="welcome-ask-ai-btn"
            onClick={handleQuickAiOptimize}
            className="self-start md:self-center px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-semibold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Ask FinPilot AI</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </motion.div>

      {/* Grid: Balances / KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="dashboard-kpis">
        
        {/* KPI 1: Net Asset Vault */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200/50 dark:border-zinc-850 shadow-sm flex flex-col justify-between" id="kpi-net-vault">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 dark:text-zinc-500 font-mono font-bold uppercase tracking-wider">NET PORTFOLIO VAULT</span>
            <div className="h-9 w-9 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500 dark:text-indigo-400 rounded-lg flex items-center justify-center">
              <Wallet className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
              ${netBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h3>
            <p className="text-[10px] text-emerald-500 font-mono font-bold flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3" />
              <span>+12.4% vs last month</span>
            </p>
          </div>
        </div>

        {/* KPI 2: Monthly Income */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200/50 dark:border-zinc-850 shadow-sm flex flex-col justify-between" id="kpi-monthly-income">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 dark:text-zinc-500 font-mono font-bold uppercase tracking-wider">JULY TOTAL INCOME</span>
            <div className="h-9 w-9 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 dark:text-emerald-400 rounded-lg flex items-center justify-center">
              <ArrowDownLeft className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
              ${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h3>
            <p className="text-[10px] text-gray-400 font-mono mt-1">
              Accrued across {transactions.filter(t => t.type === 'income').length} deposit sources
            </p>
          </div>
        </div>

        {/* KPI 3: Monthly Spending */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200/50 dark:border-zinc-850 shadow-sm flex flex-col justify-between" id="kpi-monthly-spending">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 dark:text-zinc-500 font-mono font-bold uppercase tracking-wider">JULY COMPLETED SPENT</span>
            <div className="h-9 w-9 bg-rose-50 dark:bg-rose-950/20 text-rose-500 dark:text-rose-400 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
              ${totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h3>
            <p className="text-[10px] text-gray-400 font-mono mt-1">
              Debited over {transactions.filter(t => t.type === 'expense').length} categories
            </p>
          </div>
        </div>

        {/* KPI 4: Financial Score */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200/50 dark:border-zinc-850 shadow-sm flex flex-col justify-between" id="kpi-financial-score">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 dark:text-zinc-500 font-mono font-bold uppercase tracking-wider">FINANCIAL STABILITY SCORE</span>
            <div className="h-9 w-9 bg-cyan-50 dark:bg-cyan-950/20 text-cyan-500 dark:text-cyan-400 rounded-lg flex items-center justify-center">
              <Percent className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
              {userProfile.financialScore} <span className="text-sm text-gray-400">/ 100</span>
            </h3>
            <div className="w-full bg-gray-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${userProfile.financialScore}%` }} />
            </div>
          </div>
        </div>

      </div>

      {/* Row: Recharts & Budgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="dashboard-analytics-row">
        
        {/* Recharts Area Chart (Wealth trajectory) */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-200/50 dark:border-zinc-850 shadow-sm flex flex-col" id="dashboard-chart-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-sans font-bold text-base text-gray-950 dark:text-white">Net Cash Flow Horizon</h3>
              <p className="text-xs text-gray-400 dark:text-zinc-500 mt-0.5">Rolling overview of monthly income versus completed expenses.</p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 dark:text-indigo-400 px-2 py-1 rounded-full uppercase">PERSISTED HISTORIC DATA</span>
          </div>

          <div className="h-72 w-full mt-2" id="dashboard-responsive-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_MONTHLY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#71717a' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#71717a' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(9, 9, 11, 0.95)', 
                    borderColor: 'rgba(39, 39, 42, 0.8)',
                    color: '#fff',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontFamily: 'monospace'
                  }} 
                />
                <Area type="monotone" dataKey="Income" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="Expense" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget overview panel */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-200/50 dark:border-zinc-850 shadow-sm flex flex-col justify-between" id="dashboard-budget-overview">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-sans font-bold text-base text-gray-950 dark:text-white">Active Budget Usage</h3>
              <button onClick={() => setCurrentView('budget')} className="text-xs font-semibold text-indigo-500 hover:underline flex items-center gap-1 cursor-pointer">
                <span>View All</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            
            <div className="space-y-4">
              {budgets.slice(0, 4).map((b) => {
                const percentage = Math.min(100, (b.spent / b.limit) * 100);
                const isOverBudget = b.spent > b.limit;

                return (
                  <div key={b.id} className="space-y-1" id={`budget-widget-${b.id}`}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-gray-700 dark:text-zinc-300">{b.category}</span>
                      <span className={`font-mono ${isOverBudget ? 'text-red-500 font-bold' : 'text-gray-500 dark:text-zinc-400'}`}>
                        ${b.spent.toFixed(0)} / ${b.limit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-300" 
                        style={{ 
                          width: `${percentage}%`, 
                          backgroundColor: isOverBudget ? '#ef4444' : b.color 
                        }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-zinc-800/80 pt-4 mt-6">
            <div className="flex gap-4 items-center bg-gray-50 dark:bg-zinc-950/60 p-3 rounded-2xl border border-gray-200/40 dark:border-zinc-850">
              <ShieldCheck className="h-6 w-6 text-indigo-500 shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-gray-900 dark:text-white font-sans">94% Budget Compliance Rate</p>
                <p className="text-[10px] text-gray-400 leading-tight font-sans">You saved $420.00 compared to last month's velocity.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Row: Recent Transactions & AI Recommendation Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="dashboard-recent-row">
        
        {/* Transactions List */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-200/50 dark:border-zinc-850 shadow-sm flex flex-col justify-between" id="dashboard-recent-transactions">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-sans font-bold text-base text-gray-950 dark:text-white">Recent Transactions</h3>
                <p className="text-xs text-gray-400 dark:text-zinc-500 mt-0.5">Real-time ledger updates across linked accounts.</p>
              </div>
              <button onClick={() => setCurrentView('expenses')} className="text-xs font-semibold text-indigo-500 hover:underline flex items-center gap-1 cursor-pointer">
                <span>Ledger Suite</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="divide-y divide-gray-50 dark:divide-zinc-850">
              {recentTx.map((tx) => (
                <div key={tx.id} className="py-3 flex items-center justify-between" id={`recent-tx-row-${tx.id}`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                      tx.type === 'income' 
                        ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500' 
                        : 'bg-zinc-50 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400'
                    }`}>
                      {tx.type === 'income' ? <Coins className="h-4.5 w-4.5" /> : <Receipt className="h-4.5 w-4.5" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{tx.description}</p>
                      <p className="text-[10px] text-gray-400 font-sans mt-0.5">{tx.category} • {tx.paymentMethod}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold font-mono ${tx.type === 'income' ? 'text-emerald-500' : 'text-gray-950 dark:text-white'}`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </p>
                    <span className="text-[9px] text-gray-400 font-mono">{tx.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendation Widget */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-250/60 dark:border-zinc-850 shadow-sm flex flex-col justify-between" id="dashboard-ai-widget">
          <div>
            <div className="flex items-center gap-2 text-[10px] text-indigo-500 dark:text-indigo-400 font-mono tracking-widest font-bold uppercase">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>FinPilot Recommendation</span>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-bold text-gray-950 dark:text-white leading-tight">Optimization Identified: Pausing $45.00 Redundant SaaS Subscriptions</h4>
              <p className="text-xs text-gray-500 dark:text-zinc-400 mt-2.5 leading-relaxed">
                Our analysis shows overlapping capabilities between your Linear App Premium subscription and your current team Slack integrations. Pausing one will net an additional **$45.00** monthly towards your Sinking Emergency goal.
              </p>
            </div>

            <div className="mt-4 p-3 bg-indigo-50/30 dark:bg-indigo-950/10 rounded-2xl border border-indigo-500/10 text-xs text-indigo-600 dark:text-indigo-400 leading-relaxed font-sans font-medium">
              "We recommend immediately adjusting your Discretionary Dining allocation to secure an extra $120.00."
            </div>
          </div>

          <button
            id="optimize-action-btn"
            onClick={handleQuickAiOptimize}
            className="w-full mt-6 py-3 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold rounded-xl transition-all hover:bg-zinc-900 dark:hover:bg-white flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Review Overlaps in AI Room</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
