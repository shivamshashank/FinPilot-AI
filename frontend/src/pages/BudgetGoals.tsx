import React, { useState } from 'react';
import { useApp } from '../components/AppContext';
import { 
  Plus, 
  PiggyBank, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight,
  Gift,
  PlusCircle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BudgetGoals() {
  const { 
    budgets, 
    addBudget, 
    editBudget, 
    deleteBudget, 
    savingsGoals, 
    addSavingsGoal, 
    contributeToGoal, 
    deleteSavingsGoal,
    userProfile 
  } = useApp();

  // Modal open states
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showContributeModal, setShowContributeModal] = useState<string | null>(null);

  // Form states (Budget)
  const [bCategory, setBCategory] = useState('Groceries');
  const [bLimit, setBLimit] = useState('');
  const [bColor, setBColor] = useState('#10b981');

  // Form states (Goal)
  const [gName, setGName] = useState('');
  const [gTarget, setGTarget] = useState('');
  const [gDeadline, setGDeadline] = useState('2026-12-31');
  const [gColor, setGColor] = useState('#10b981');
  const [gCategory, setGCategory] = useState('Safety');

  // Form states (Contribute)
  const [contributeAmount, setContributeAmount] = useState('');

  const categories = ["Housing", "Groceries", "Dining Out", "Transport", "Entertainment", "Shopping", "Software SaaS", "Utilities", "Health & Fitness"];
  const colorSwatches = ["#6366f1", "#10b981", "#f59e0b", "#3b82f6", "#ec4899", "#8b5cf6", "#06b6d4", "#f43f5e"];

  const handleCreateBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bLimit || isNaN(parseFloat(bLimit)) || parseFloat(bLimit) <= 0) {
      alert("Please enter a valid limit.");
      return;
    }

    addBudget({
      category: bCategory,
      limit: parseFloat(bLimit),
      color: bColor,
      period: 'monthly'
    });

    setBLimit('');
    setShowAddBudget(false);
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gName || !gTarget || isNaN(parseFloat(gTarget)) || parseFloat(gTarget) <= 0) {
      alert("Please enter a valid target amount.");
      return;
    }

    addSavingsGoal({
      name: gName,
      target: parseFloat(gTarget),
      deadline: gDeadline,
      color: gColor,
      category: gCategory
    });

    setGName('');
    setGTarget('');
    setShowAddGoal(false);
  };

  const handleContributeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showContributeModal) return;
    if (!contributeAmount || isNaN(parseFloat(contributeAmount)) || parseFloat(contributeAmount) <= 0) {
      alert("Please enter a valid amount to contribute.");
      return;
    }

    contributeToGoal(showContributeModal, parseFloat(contributeAmount));
    setContributeAmount('');
    setShowContributeModal(null);
  };

  const handleAutoApplyAiSuggestion = () => {
    // Let's optimize: Lower Dining Out budget from 400 to 300, and add a contribution to Tokyo Trip!
    const diningBudget = budgets.find(b => b.category === 'Dining Out');
    if (diningBudget) {
      editBudget({
        ...diningBudget,
        limit: 300
      });
      alert("AI Suggestion Applied: Lowered 'Dining Out' limit to $300.00 and locked $100.00 of psychological room. We have noted this on your AI dashboard.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="budget-goals-page">
      
      {/* LEFT COLUMN: ACTIVE BUDGETS (7 cols) */}
      <div className="lg:col-span-7 space-y-6" id="budgets-panel">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-950 dark:text-white">Active Monthly Budgets</h1>
            <p className="text-xs text-gray-400 dark:text-zinc-500 mt-0.5 font-sans">Establish spending limits per categoric pool to restrict friction.</p>
          </div>
          <button
            id="budgets-add-btn"
            onClick={() => setShowAddBudget(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-500/10 text-xs font-bold rounded-xl hover:bg-indigo-100 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Create Budget</span>
          </button>
        </div>

        {/* Budgets Grid List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="budgets-grid">
          {budgets.map((b) => {
            const percentage = Math.min(100, (b.spent / b.limit) * 100);
            const isOver = b.spent > b.limit;
            const remaining = b.limit - b.spent;

            return (
              <div 
                key={b.id} 
                className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-200/50 dark:border-zinc-850 shadow-sm flex flex-col justify-between"
                id={`budget-card-${b.id}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{b.category}</span>
                    <span 
                      className="h-2.5 w-2.5 rounded-full shrink-0" 
                      style={{ backgroundColor: isOver ? '#ef4444' : b.color }} 
                    />
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-extrabold text-gray-900 dark:text-white">${b.spent.toFixed(0)}</span>
                      <span className="text-xs text-gray-400 font-sans">spent / ${b.limit}</span>
                    </div>

                    <div className="w-full bg-gray-100 dark:bg-zinc-850 h-2 rounded-full overflow-hidden mt-3">
                      <div 
                        className="h-full rounded-full transition-all duration-300" 
                        style={{ 
                          width: `${percentage}%`, 
                          backgroundColor: isOver ? '#ef4444' : b.color 
                        }} 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 dark:border-zinc-850/50 pt-3.5 mt-4 text-[10px] font-mono">
                  {isOver ? (
                    <span className="text-red-500 font-bold flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      <span>OVER BY ${Math.abs(remaining).toFixed(0)}</span>
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      ${remaining.toFixed(0)} AVAILABLE
                    </span>
                  )}

                  <button
                    id={`delete-budget-${b.id}`}
                    onClick={() => {
                      if (confirm(`Delete the budget allocation for ${b.category}?`)) deleteBudget(b.id);
                    }}
                    className="text-gray-400 hover:text-red-500 cursor-pointer"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Budget Insights panel */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-200/50 dark:border-zinc-850 shadow-sm" id="budget-insights-widget">
          <h3 className="font-sans font-bold text-sm text-gray-950 dark:text-white">Boundary Compliance Insights</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs font-sans">
            <div className="flex gap-3 items-start bg-emerald-50/20 dark:bg-emerald-950/5 p-3.5 rounded-2xl border border-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Compliant Boundaries (6/7)</p>
                <p className="text-[10px] text-gray-400 leading-normal mt-0.5">Most categories sit comfortably below their limits. Your groceries pace is highly optimized.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start bg-amber-50/20 dark:bg-amber-950/5 p-3.5 rounded-2xl border border-amber-500/10 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Nearing Limits (1/7)</p>
                <p className="text-[10px] text-gray-400 leading-normal mt-0.5">Housing is at 97% capacity. We recommend ensuring any heating/water bills do not spill over.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: SAVINGS GOALS (5 cols) */}
      <div className="lg:col-span-5 space-y-6" id="savings-goals-panel">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-950 dark:text-white">Savings Targets</h1>
            <p className="text-xs text-gray-400 dark:text-zinc-500 mt-0.5 font-sans">Track and lock asset reserves for milestones.</p>
          </div>
          <button
            id="goals-add-btn"
            onClick={() => setShowAddGoal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-900 dark:bg-zinc-800 text-white text-xs font-bold rounded-xl hover:bg-zinc-850 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Target</span>
          </button>
        </div>

        {/* Goals cards List */}
        <div className="space-y-4" id="goals-list">
          {savingsGoals.map((g) => {
            const percentage = Math.min(100, (g.current / g.target) * 100);
            const isCompleted = g.current >= g.target;

            return (
              <div 
                key={g.id} 
                className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-250/50 dark:border-zinc-850 shadow-sm flex flex-col justify-between"
                id={`goal-card-${g.id}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center">
                      <PiggyBank className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-950 dark:text-white font-sans">{g.name}</h4>
                      <span className="text-[9px] text-gray-400 font-mono">DEADLINE: {g.deadline}</span>
                    </div>
                  </div>
                  
                  <span className="text-[10px] font-mono bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 dark:text-indigo-400 font-bold px-2.5 py-0.5 rounded-full">
                    {percentage.toFixed(0)}% FUNDED
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-gray-450 font-sans">Total Reserves</span>
                    <span className="font-mono font-bold text-gray-900 dark:text-white">
                      ${g.current.toLocaleString()} / ${g.target.toLocaleString()}
                    </span>
                  </div>

                  <div className="w-full bg-gray-100 dark:bg-zinc-850 h-2.5 rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full rounded-full transition-all duration-300" 
                      style={{ 
                        width: `${percentage}%`, 
                        backgroundColor: isCompleted ? '#10b981' : g.color 
                      }} 
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 dark:border-zinc-850/40 pt-3.5 mt-4">
                  <button
                    id={`delete-goal-${g.id}`}
                    onClick={() => {
                      if (confirm(`Remove savings goal target: ${g.name}?`)) deleteSavingsGoal(g.id);
                    }}
                    className="text-[10px] font-mono text-gray-400 hover:text-red-500 cursor-pointer"
                  >
                    REMOVE
                  </button>
                  
                  {!isCompleted && (
                    <button
                      id={`contribute-goal-${g.id}`}
                      onClick={() => setShowContributeModal(g.id)}
                      className="text-[11px] font-bold text-indigo-500 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span>Contribute Cash</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* AI suggestions component */}
        <div className="bg-zinc-950 dark:bg-zinc-900 border-2 border-indigo-500 p-6 rounded-3xl text-white flex flex-col justify-between shadow-xl" id="ai-budget-suggestions">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] text-indigo-400 font-mono tracking-widest font-bold uppercase">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>FinPilot Recommendation Loop</span>
            </div>
            
            <h3 className="text-sm font-bold text-white mt-4">Optimize Dining Out to fund Tokyo Trip 42 days early</h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              You are currently pacing $100.00 under your Dining Out limit. By choosing to lower your Dining Out budget boundary to **$300.00**, we can automatically sweep the $100.00 difference straight to your **Tokyo Trip 2027** goal.
            </p>
          </div>

          <button
            id="apply-ai-budget-suggestion"
            onClick={handleAutoApplyAiSuggestion}
            className="w-full mt-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Auto-Apply Suggestion Layout</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>

      {/* DIALOG MODAL: CREATE BUDGET */}
      <AnimatePresence>
        {showAddBudget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm" id="budget-add-overlay">
            <motion.div
              id="budget-add-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 border border-gray-250 dark:border-zinc-800 rounded-3xl w-full max-w-md shadow-2xl p-6 font-sans"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800">
                <h3 className="font-sans font-bold text-base text-gray-950 dark:text-white">Establish Budget Limit</h3>
                <button onClick={() => setShowAddBudget(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer">
                  <X className="h-4.5 w-4.5 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleCreateBudget} className="space-y-4 mt-4">
                {/* Limit */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="budget-limit-field">Monthly Budget Limit ({userProfile.currency})</label>
                  <input
                    id="budget-limit-field"
                    type="number"
                    step="50"
                    min="50"
                    required
                    placeholder="e.g. 500"
                    value={bLimit}
                    onChange={(e) => setBLimit(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-sm font-bold outline-none focus:border-indigo-500 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Category Selection */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="budget-category-field">Target Category</label>
                  <select
                    id="budget-category-field"
                    value={bCategory}
                    onChange={(e) => setBCategory(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 text-gray-900 dark:text-white cursor-pointer"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Color swatch selection */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400">Representative Color Tag</label>
                  <div className="flex gap-2 flex-wrap pt-1">
                    {colorSwatches.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setBColor(color)}
                        className={`h-6 w-6 rounded-full border transition-all cursor-pointer ${
                          bColor === color 
                            ? 'scale-110 ring-2 ring-indigo-500 dark:ring-white border-transparent' 
                            : 'border-gray-200/50 dark:border-zinc-800'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <button
                  id="submit-budget-btn"
                  type="submit"
                  className="w-full h-10 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer mt-4"
                >
                  Confirm Budget Boundary
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DIALOG MODAL: CREATE SAVINGS GOAL */}
      <AnimatePresence>
        {showAddGoal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm" id="goal-add-overlay">
            <motion.div
              id="goal-add-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 border border-gray-250 dark:border-zinc-800 rounded-3xl w-full max-w-md shadow-2xl p-6 font-sans"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800">
                <h3 className="font-sans font-bold text-base text-gray-950 dark:text-white">Create Savings Target</h3>
                <button onClick={() => setShowAddGoal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer">
                  <X className="h-4.5 w-4.5 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleCreateGoal} className="space-y-4 mt-4">
                {/* Goal Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="goal-name-field">Target Name / Description</label>
                  <input
                    id="goal-name-field"
                    type="text"
                    required
                    placeholder="e.g. Sinking Emergency Pool, New laptop..."
                    value={gName}
                    onChange={(e) => setGName(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Target Amount */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="goal-target-field">Target Amount ({userProfile.currency})</label>
                  <input
                    id="goal-target-field"
                    type="number"
                    step="100"
                    min="100"
                    required
                    placeholder="e.g. 10000"
                    value={gTarget}
                    onChange={(e) => setGTarget(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-sm font-bold outline-none focus:border-indigo-500 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Classification and Deadline */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="goal-classification">Classification</label>
                    <select
                      id="goal-classification"
                      value={gCategory}
                      onChange={(e) => setGCategory(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 text-gray-900 dark:text-white cursor-pointer"
                    >
                      <option value="Safety">Safety</option>
                      <option value="Travel">Travel</option>
                      <option value="Vehicle">Vehicle</option>
                      <option value="Property">Property</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="goal-deadline-field">Deadline</label>
                    <input
                      id="goal-deadline-field"
                      type="date"
                      required
                      value={gDeadline}
                      onChange={(e) => setGDeadline(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Color swatch selection */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400">Target Color Tag</label>
                  <div className="flex gap-2 flex-wrap pt-1">
                    {colorSwatches.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setGColor(color)}
                        className={`h-6 w-6 rounded-full border transition-all cursor-pointer ${
                          gColor === color 
                            ? 'scale-110 ring-2 ring-indigo-500 dark:ring-white border-transparent' 
                            : 'border-gray-200/50 dark:border-zinc-800'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <button
                  id="submit-goal-btn"
                  type="submit"
                  className="w-full h-10 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer mt-4"
                >
                  Lock Savings Target
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DIALOG MODAL: CONTRIBUTE TO GOAL */}
      <AnimatePresence>
        {showContributeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm" id="contribute-overlay">
            <motion.div
              id="contribute-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 border border-gray-250 dark:border-zinc-800 rounded-3xl w-full max-w-sm shadow-2xl p-6 font-sans"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800">
                <h3 className="font-sans font-bold text-base text-gray-950 dark:text-white flex items-center gap-2">
                  <Gift className="h-5 w-5 text-indigo-500" />
                  <span>Contribute Savings</span>
                </h3>
                <button onClick={() => setShowContributeModal(null)} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer">
                  <X className="h-4.5 w-4.5 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleContributeSubmit} className="space-y-4 mt-4">
                <p className="text-xs text-gray-500 dark:text-zinc-400 font-sans leading-relaxed">
                  How much capital would you like to allocate from your checking pool to lock inside this savings vault target?
                </p>

                {/* Amount */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="contribution-amount-field">Contribution Amount ({userProfile.currency})</label>
                  <input
                    id="contribution-amount-field"
                    type="number"
                    step="10"
                    min="10"
                    required
                    placeholder="e.g. 250"
                    value={contributeAmount}
                    onChange={(e) => setContributeAmount(e.target.value)}
                    className="w-full h-12 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-lg font-bold outline-none focus:border-indigo-500 text-gray-900 dark:text-white"
                  />
                </div>

                <button
                  id="submit-contribution-btn"
                  type="submit"
                  className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="h-4.5 w-4.5" />
                  <span>Execute Sweep Transfer</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
