import React, { useState, useRef, useEffect } from 'react';
import { useApp } from './AppContext';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import ThemeToggle from './ThemeToggle';
import {
  Bell,
  Search,
  Plus,
  Sparkles,
  ChevronRight,
  User,
  Settings,
  LogOut,
  X,
  TrendingUp,
  Receipt,
  PiggyBank,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import Pages
import Dashboard from '../pages/Dashboard';
import Expenses from '../pages/Expenses';
import Income from '../pages/Income';
import BudgetGoals from '../pages/BudgetGoals';
import Analytics from '../pages/Analytics';
import AIAssistant from '../pages/AIAssistant';
import Notifications from '../pages/Notifications';
import SettingsPage from '../pages/Settings';

export default function Layout() {
  const {
    currentView,
    setCurrentView,
    logout,
    userProfile,
    alerts,
    markAlertAsRead,
    addTransaction,
    budgets
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAddTxModal, setShowAddTxModal] = useState(false);

  // Form states for quick transaction addition
  const [txType, setTxType] = useState<'income' | 'expense'>('expense');
  const [txCategory, setTxCategory] = useState('Groceries');
  const [txAmount, setTxAmount] = useState('');
  const [txDate, setTxDate] = useState(new Date().toISOString().split('T')[0]);
  const [txDesc, setTxDesc] = useState('');
  const [txMethod, setTxMethod] = useState('Apple Pay (Chase Visa)');

  const notificationsDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Categories based on Type
  const categories = txType === 'expense'
    ? ["Housing", "Groceries", "Dining Out", "Transport", "Entertainment", "Shopping", "Software SaaS", "Utilities", "Health & Fitness"]
    : ["Salary", "Freelance", "Business", "Investment"];

  // Methods
  const paymentMethods = txType === 'expense'
    ? ["Apple Pay (Chase Visa)", "Chase Sapphire", "Visa Premium", "ACH Auto-Pay", "Bank Debit Card", "Cash"]
    : ["Direct Deposit", "Stripe", "PayPal", "Brokerage Transfer", "Cash"];

  useEffect(() => {
    // Set first category when type shifts
    setTxCategory(categories[0]);
  }, [txType]);

  // Handle outside click to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsDropdownRef.current && !notificationsDropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddTxSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txAmount || isNaN(parseFloat(txAmount)) || parseFloat(txAmount) <= 0) {
      alert("Please enter a valid positive amount.");
      return;
    }

    addTransaction({
      type: txType,
      category: txCategory,
      amount: parseFloat(txAmount),
      date: txDate,
      description: txDesc || `${txCategory} log`,
      paymentMethod: txMethod,
      status: 'completed'
    });

    // Reset form & close modal
    setTxAmount('');
    setTxDesc('');
    setShowAddTxModal(false);
  };

  const unreadAlerts = alerts.filter(a => !a.read);
  const activeAlertsToShow = alerts.slice(0, 5);

  const getBreadcrumbLabel = () => {
    switch (currentView) {
      case 'dashboard': return 'Dashboard';
      case 'expenses': return 'Expense Management';
      case 'income': return 'Income Hub';
      case 'budget': return 'Budgets & Goals';
      case 'analytics': return 'Wealth Analytics';
      case 'assistant': return 'FinPilot AI Assistant';
      case 'notifications': return 'Notifications Center';
      case 'settings': return 'Profile & Settings';
      default: return 'Overview';
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'expenses': return <Expenses />;
      case 'income': return <Income />;
      case 'budget': return <BudgetGoals />;
      case 'analytics': return <Analytics />;
      case 'assistant': return <AIAssistant />;
      case 'notifications': return <Notifications />;
      case 'settings': return <SettingsPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-zinc-950 overflow-hidden font-sans text-gray-900 dark:text-zinc-150" id="authenticated-shell">
      {/* Collapsible Sidebar - Desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative h-screen pb-16 md:pb-0" id="main-scroll-wrapper">
        {/* Top bar header */}
        <header
          id="main-topbar"
          className="h-16 bg-white dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-200/50 dark:border-zinc-900/50 px-6 flex items-center justify-between shrink-0 sticky top-0 z-40"
        >
          {/* Left: Breadcrumbs & Views */}
          <div className="flex items-center gap-2" id="topbar-breadcrumbs">
            <span className="text-xs font-mono text-gray-400 dark:text-zinc-500">Vault</span>
            <ChevronRight className="h-3 w-3 text-gray-350 dark:text-zinc-600" />
            <span className="text-sm font-semibold text-gray-800 dark:text-zinc-100 font-sans tracking-tight">
              {getBreadcrumbLabel()}
            </span>
          </div>

          {/* Right: Quick Tools */}
          <div className="flex items-center gap-3" id="topbar-actions">

            {/* Quick transaction add button */}
            <button
              id="topbar-quick-add-btn"
              onClick={() => setShowAddTxModal(true)}
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Log Transaction</span>
            </button>

            {/* AI Assistant quick jump */}
            <button
              id="topbar-ai-sparkle-btn"
              onClick={() => setCurrentView('assistant')}
              className="p-2 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/10 rounded-lg transition-colors cursor-pointer"
              title="Ask FinPilot AI"
            >
              <Sparkles className="h-4.5 w-4.5 animate-pulse" />
            </button>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Notifications Dropdown */}
            <div className="relative" ref={notificationsDropdownRef}>
              <button
                id="topbar-notifications-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg text-gray-500 dark:text-zinc-400 relative cursor-pointer"
              >
                <Bell className="h-4.5 w-4.5" />
                {unreadAlerts.length > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    id="topbar-notifications-dropdown"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2.5 w-80 bg-white dark:bg-zinc-900 border border-gray-250 dark:border-zinc-850 rounded-2xl shadow-xl overflow-hidden z-50 font-sans"
                  >
                    <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                      <span className="font-semibold text-xs uppercase tracking-wider text-gray-400 dark:text-zinc-500">Unread Insights ({unreadAlerts.length})</span>
                      <button
                        onClick={() => setCurrentView('notifications')}
                        className="text-xs text-indigo-500 hover:underline cursor-pointer"
                      >
                        All Alerts
                      </button>
                    </div>

                    <div className="max-h-72 overflow-y-auto divide-y divide-gray-50 dark:divide-zinc-800">
                      {activeAlertsToShow.length === 0 ? (
                        <p className="p-6 text-center text-xs text-gray-400 dark:text-zinc-500 font-sans">No notifications received.</p>
                      ) : (
                        activeAlertsToShow.map((alert) => (
                          <div
                            key={alert.id}
                            onClick={() => {
                              markAlertAsRead(alert.id);
                              setShowNotifications(false);
                            }}
                            className={`p-3.5 hover:bg-gray-50 dark:hover:bg-zinc-850/50 cursor-pointer flex gap-2.5 items-start ${!alert.read ? 'bg-indigo-50/15 dark:bg-indigo-950/5' : ''}`}
                          >
                            <span className={`h-2 w-2 rounded-full shrink-0 mt-1.5 ${
                              alert.type === 'success' ? 'bg-emerald-500' :
                              alert.type === 'warning' ? 'bg-amber-500' :
                              alert.type === 'alert' ? 'bg-red-500' : 'bg-blue-500'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{alert.title}</p>
                              <p className="text-[10px] text-gray-500 dark:text-zinc-400 line-clamp-2 mt-0.5">{alert.description}</p>
                              <span className="text-[9px] text-gray-400 font-mono mt-1 block">
                                {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Menu Dropdown */}
            <div className="relative" ref={userDropdownRef}>
              <button
                id="topbar-profile-btn"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="h-8 w-8 rounded-full overflow-hidden border border-gray-200 dark:border-zinc-800 flex items-center justify-center cursor-pointer relative"
              >
                <img src={userProfile.avatarUrl} alt={userProfile.name} className="h-full w-full object-cover" />
              </button>

              <AnimatePresence>
                {showUserDropdown && (
                  <motion.div
                    id="topbar-profile-dropdown"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2.5 w-56 bg-white dark:bg-zinc-900 border border-gray-250 dark:border-zinc-850 rounded-2xl shadow-xl overflow-hidden z-50 font-sans"
                  >
                    <div className="p-4 border-b border-gray-100 dark:border-zinc-800">
                      <p className="text-xs font-bold text-gray-950 dark:text-white truncate">{userProfile.name}</p>
                      <p className="text-[10px] text-gray-400 dark:text-zinc-500 truncate mt-0.5">{userProfile.email}</p>
                    </div>

                    <div className="p-1.5 space-y-0.5">
                      <button
                        onClick={() => { setCurrentView('settings'); setShowUserDropdown(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-850 rounded-xl transition-all cursor-pointer"
                      >
                        <User className="h-4 w-4" />
                        <span>My Profile</span>
                      </button>
                      <button
                        onClick={() => { setCurrentView('settings'); setShowUserDropdown(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-850 rounded-xl transition-all cursor-pointer"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Security & Settings</span>
                      </button>
                    </div>

                    <div className="p-1.5 border-t border-gray-100 dark:border-zinc-800">
                      <button
                        onClick={() => { logout(); setShowUserDropdown(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </header>

        {/* Scrollable Container Page Panel */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-8 max-w-7xl w-full mx-auto" id="view-renderer-container">
          {renderView()}
        </main>

        {/* Mobile Bottom Navigation Menu */}
        <BottomNav />
      </div>

      {/* GLOBAL MODAL: ADD TRANSACTION QUICK ACTION */}
      <AnimatePresence>
        {showAddTxModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm" id="quick-add-modal-overlay">
            <motion.div
              id="quick-add-modal-card"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-zinc-900 border border-gray-250 dark:border-zinc-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden font-sans"
            >
              <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                <h3 className="font-sans font-bold text-lg text-gray-950 dark:text-white">Log New Transaction</h3>
                <button
                  id="close-add-tx-modal"
                  onClick={() => setShowAddTxModal(false)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-zinc-900 dark:hover:text-white rounded-lg cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddTxSubmit} className="p-6 space-y-4">

                {/* Type Selection (Income vs Expense Toggle) */}
                <div className="flex gap-2 p-1.5 bg-gray-100 dark:bg-zinc-950 rounded-2xl border border-gray-200/50 dark:border-zinc-850">
                  <button
                    id="modal-tx-type-expense"
                    type="button"
                    onClick={() => setTxType('expense')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      txType === 'expense'
                        ? 'bg-white dark:bg-zinc-800 text-red-500 shadow-sm'
                        : 'text-gray-400 dark:text-zinc-500 hover:text-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <Receipt className="h-4.5 w-4.5" />
                      <span>EXPENSE LOG</span>
                    </div>
                  </button>
                  <button
                    id="modal-tx-type-income"
                    type="button"
                    onClick={() => setTxType('income')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      txType === 'income'
                        ? 'bg-white dark:bg-zinc-800 text-emerald-500 shadow-sm'
                        : 'text-gray-400 dark:text-zinc-500 hover:text-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <TrendingUp className="h-4.5 w-4.5" />
                      <span>INCOME HUB</span>
                    </div>
                  </button>
                </div>

                {/* Amount */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 dark:text-zinc-400" htmlFor="modal-tx-amount">Amount ({userProfile.currency})</label>
                  <input
                    id="modal-tx-amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    placeholder="0.00"
                    value={txAmount}
                    onChange={(e) => setTxAmount(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-lg font-bold outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 transition-all text-gray-900 dark:text-white"
                  />
                </div>

                {/* Category & Date in Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 dark:text-zinc-400" htmlFor="modal-tx-category">Category</label>
                    <select
                      id="modal-tx-category"
                      value={txCategory}
                      onChange={(e) => setTxCategory(e.target.value)}
                      className="w-full h-12 px-3.5 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-sm outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 text-gray-900 dark:text-white cursor-pointer"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 dark:text-zinc-400" htmlFor="modal-tx-date">Date</label>
                    <input
                      id="modal-tx-date"
                      type="date"
                      required
                      value={txDate}
                      onChange={(e) => setTxDate(e.target.value)}
                      className="w-full h-12 px-3.5 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-sm outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 dark:text-zinc-400" htmlFor="modal-tx-desc">Description</label>
                  <input
                    id="modal-tx-desc"
                    type="text"
                    placeholder="Merchant, label, details..."
                    value={txDesc}
                    onChange={(e) => setTxDesc(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-sm outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Payment / Deposit Method */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 dark:text-zinc-400" htmlFor="modal-tx-method">
                    {txType === 'expense' ? 'Payment Method' : 'Deposit Goal Pool'}
                  </label>
                  <select
                    id="modal-tx-method"
                    value={txMethod}
                    onChange={(e) => setTxMethod(e.target.value)}
                    className="w-full h-12 px-3.5 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-sm outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 text-gray-900 dark:text-white cursor-pointer"
                  >
                    {paymentMethods.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* Submit button */}
                <button
                  id="modal-tx-submit"
                  type="submit"
                  className="w-full h-12 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold rounded-xl text-sm hover:bg-zinc-900 dark:hover:bg-white transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Log Transaction Detail</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
