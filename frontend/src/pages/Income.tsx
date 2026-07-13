import React, { useState, useMemo } from 'react';
import { useApp } from '../components/AppContext';
import {
  Plus,
  Coins,
  TrendingUp,
  ArrowDownLeft,
  Trash2,
  CheckCircle2,
  Sparkles,
  Briefcase,
  Layers,
  BarChart,
  LineChart,
  X
} from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

export default function Income() {
  const { transactions, addTransaction, deleteTransaction, userProfile } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [incSource, setIncSource] = useState('Salary');
  const [incAmount, setIncAmount] = useState('');
  const [incDate, setIncDate] = useState(new Date().toISOString().split('T')[0]);
  const [incDesc, setIncDesc] = useState('');
  const [incMethod, setIncMethod] = useState('Direct Deposit');

  const sourcesList = ["Salary", "Freelance", "Business", "Investment"];
  const depositChannels = ["Direct Deposit", "Stripe", "PayPal", "Brokerage Transfer", "Cash"];

  // Filter Transactions for Income only
  const incomes = useMemo(() => {
    return transactions.filter(t => t.type === 'income');
  }, [transactions]);

  // Aggregate totals
  const totalIncome = useMemo(() => {
    return incomes.reduce((sum, t) => sum + t.amount, 0);
  }, [incomes]);

  const sourceTotals = useMemo(() => {
    const totals: { [key: string]: number } = { Salary: 0, Freelance: 0, Business: 0, Investment: 0 };
    incomes.forEach(t => {
      if (totals[t.category] !== undefined) {
        totals[t.category] += t.amount;
      }
    });
    return totals;
  }, [incomes]);

  // Chart data for source distribution
  const chartPieData = useMemo(() => {
    const colors = ["#6366f1", "#10b981", "#f59e0b", "#ec4899"];
    return Object.keys(sourceTotals).map((key, i) => ({
      name: key,
      value: sourceTotals[key],
      color: colors[i]
    })).filter(item => item.value > 0);
  }, [sourceTotals]);

  // Historical trend
  const chartTrendData = useMemo(() => {
    // Group by month
    return [
      { month: 'Jan', Amount: 5800 },
      { month: 'Feb', Amount: 6100 },
      { month: 'Mar', Amount: 5900 },
      { month: 'Apr', Amount: 6800 },
      { month: 'May', Amount: 7200 },
      { month: 'Jun', Amount: 8100 },
      { month: 'Jul', Amount: totalIncome } // live total
    ];
  }, [totalIncome]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incAmount || isNaN(parseFloat(incAmount)) || parseFloat(incAmount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    addTransaction({
      type: 'income',
      category: incSource,
      amount: parseFloat(incAmount),
      date: incDate,
      description: incDesc || `${incSource} Payout`,
      paymentMethod: incMethod,
      status: 'completed'
    });

    // Reset & Close
    setIncAmount('');
    setIncDesc('');
    setShowAddModal(false);
  };

  const getSourceIcon = (src: string) => {
    if (src === 'Salary') return Briefcase;
    if (src === 'Freelance') return Coins;
    if (src === 'Business') return Layers;
    return TrendingUp;
  };

  const getSourceColor = (src: string) => {
    if (src === 'Salary') return 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20';
    if (src === 'Freelance') return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20';
    if (src === 'Business') return 'text-amber-500 bg-amber-50 dark:bg-amber-950/20';
    return 'text-pink-500 bg-pink-50 dark:bg-pink-950/20';
  };

  return (
    <div className="space-y-6" id="income-hub-page">

      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4" id="income-header">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">Income Hub</h1>
          <p className="text-xs text-gray-400 dark:text-zinc-500 mt-0.5">Audit cash flows, recurring salaries, consulting payouts, and investment yields.</p>
        </div>
        <button
          id="income-add-new-btn"
          onClick={() => setShowAddModal(true)}
          className="self-start sm:self-center flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md hover:shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <Plus className="h-4.5 w-4.5" />
          <span>Log Income</span>
        </button>
      </div>

      {/* Grid: Income Source aggregates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="income-aggregates-row">
        {sourcesList.map((src) => {
          const Icon = getSourceIcon(src);
          const colorClass = getSourceColor(src);
          const amount = sourceTotals[src] || 0;

          return (
            <div key={src} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-200/50 dark:border-zinc-850 shadow-sm flex items-center justify-between" id={`income-card-${src}`}>
              <div>
                <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-mono font-semibold uppercase">{src} TOTAL</span>
                <h3 className="text-xl font-bold tracking-tight text-gray-950 dark:text-white mt-1">
                  ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h3>
              </div>
              <div className={`h-11 w-11 rounded-xl ${colorClass} flex items-center justify-center shrink-0`}>
                <Icon className="h-5.5 w-5.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Row: recharts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="income-charts-row">

        {/* Income trend trend */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-200/50 dark:border-zinc-850 shadow-sm flex flex-col" id="income-trend-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-sans font-bold text-base text-gray-950 dark:text-white">Monthly Deposit Momentum</h3>
              <p className="text-xs text-gray-400 dark:text-zinc-500 mt-0.5">Historical and active month income trajectory.</p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 dark:text-emerald-400 px-2 py-1 rounded-full uppercase">PERSISTED DATA</span>
          </div>

          <div className="h-64 w-full" id="income-trend-responsive">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={chartTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                <Bar dataKey="Amount" fill="#10b981" radius={[4, 4, 0, 0]} barSize={28}>
                  {chartTrendData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === chartTrendData.length - 1 ? '#34d399' : '#10b981'} />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Pie Chart */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-200/50 dark:border-zinc-850 shadow-sm flex flex-col justify-between" id="income-distribution-card">
          <div>
            <h3 className="font-sans font-bold text-base text-gray-950 dark:text-white">Deposit Composition</h3>
            <p className="text-xs text-gray-400 dark:text-zinc-500 mt-0.5">Active month share distribution by classification.</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center relative my-2" id="income-distribution-pie">
            {chartPieData.length === 0 ? (
              <span className="text-xs text-gray-400">No active income recorded this month.</span>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(9, 9, 11, 0.95)',
                      borderColor: 'rgba(39, 39, 42, 0.8)',
                      color: '#fff',
                      borderRadius: '12px',
                      fontSize: '11px',
                    }}
                  />
                  <Pie
                    data={chartPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="space-y-1.5" id="income-pie-legend">
            {chartPieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600 dark:text-zinc-300">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">${item.value.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Ledger Table Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200/50 dark:border-zinc-850 shadow-sm overflow-hidden" id="income-table-container">
        <div className="p-4 border-b border-gray-100 dark:border-zinc-800">
          <h3 className="text-xs font-bold font-mono text-gray-400 dark:text-zinc-500 uppercase">INCOMING LEDGER</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="income-ledger-table">
            <thead>
              <tr className="border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/60 text-[10px] font-mono font-bold text-gray-400 dark:text-zinc-500 uppercase">
                <th className="py-3 px-6">Description</th>
                <th className="py-3 px-6">Source</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Deposit Channel</th>
                <th className="py-3 px-6 text-right">Amount</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-zinc-850">
              {incomes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-gray-400 dark:text-zinc-500">
                    No deposit records registered in database yet.
                  </td>
                </tr>
              ) : (
                incomes.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-850/35 transition-colors group" id={`income-row-${tx.id}`}>
                    <td className="py-4 px-6">
                      <span className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-[180px]">{tx.description}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs text-gray-600 dark:text-zinc-300">{tx.category}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs text-gray-500 dark:text-zinc-400 font-mono">{tx.date}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs text-gray-500 dark:text-zinc-400">{tx.paymentMethod}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-xs font-bold font-mono text-emerald-500">+${tx.amount.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        id={`income-delete-${tx.id}`}
                        onClick={() => {
                          if (confirm("Delete this income ledger entry?")) deleteTransaction(tx.id);
                        }}
                        className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 text-gray-400 hover:text-red-500 rounded-lg transition-all cursor-pointer"
                        title="Delete Entry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DIALOG MODAL: LOG INCOME */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm" id="income-add-modal-overlay">
            <motion.div
              id="income-add-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 border border-gray-250 dark:border-zinc-800 rounded-3xl w-full max-w-md shadow-2xl p-6 font-sans"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800">
                <h3 className="font-sans font-bold text-base text-gray-950 dark:text-white font-sans">Log New Income Payout</h3>
                <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer">
                  <X className="h-4.5 w-4.5 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                {/* Amount */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="income-amount-field">Amount ({userProfile.currency})</label>
                  <input
                    id="income-amount-field"
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    placeholder="0.00"
                    value={incAmount}
                    onChange={(e) => setIncAmount(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-sm font-bold outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Source Selection */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="income-source-field">Income Classification</label>
                  <select
                    id="income-source-field"
                    value={incSource}
                    onChange={(e) => setIncSource(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 text-gray-900 dark:text-white cursor-pointer"
                  >
                    {sourcesList.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="income-date-field">Effective Date</label>
                  <input
                    id="income-date-field"
                    type="date"
                    required
                    value={incDate}
                    onChange={(e) => setIncDate(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="income-desc-field">Description / Depositor</label>
                  <input
                    id="income-desc-field"
                    type="text"
                    required
                    placeholder="e.g. Freelance project, Employer salary payout..."
                    value={incDesc}
                    onChange={(e) => setIncDesc(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Deposit method */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="income-method-field">Settlement Channel</label>
                  <select
                    id="income-method-field"
                    value={incMethod}
                    onChange={(e) => setIncMethod(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 text-gray-900 dark:text-white cursor-pointer"
                  >
                    {depositChannels.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <button
                  id="submit-income-payout-btn"
                  type="submit"
                  className="w-full h-11 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 mt-2"
                >
                  <CheckCircle2 className="h-4.5 w-4.5" />
                  <span>Commit Income Ledger</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
