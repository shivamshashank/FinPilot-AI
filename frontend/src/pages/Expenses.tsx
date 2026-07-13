import React, { useState, useMemo } from 'react';
import { useApp } from '../components/AppContext';
import { Transaction } from '../types';
import {
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  Trash2,
  Edit3,
  Receipt,
  Paperclip,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  UploadCloud,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Expenses() {
  const {
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    userProfile
  } = useApp();

  // Search & Filtering states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortKey, setSortKey] = useState<'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'>('date-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Drawer / Overlay states
  const [activeDetailTx, setActiveDetailTx] = useState<Transaction | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<Transaction | null>(null);

  // Upload simulation states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');

  // Form states for adding/editing
  const [txCategory, setTxCategory] = useState('Groceries');
  const [txAmount, setTxAmount] = useState('');
  const [txDate, setTxDate] = useState(new Date().toISOString().split('T')[0]);
  const [txDesc, setTxDesc] = useState('');
  const [txMethod, setTxMethod] = useState('Apple Pay (Chase Visa)');

  const categories = ["Housing", "Groceries", "Dining Out", "Transport", "Entertainment", "Shopping", "Software SaaS", "Utilities", "Health & Fitness"];
  const paymentMethods = ["Apple Pay (Chase Visa)", "Chase Sapphire", "Visa Premium", "ACH Auto-Pay", "Bank Debit Card", "Cash"];

  // Filter transactions for Expenses only
  const expenses = useMemo(() => {
    return transactions.filter(t => t.type === 'expense');
  }, [transactions]);

  // Apply Search, Filter & Sort
  const processedExpenses = useMemo(() => {
    let result = [...expenses];

    // Search filter
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(t => t.category === selectedCategory);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortKey === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortKey === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortKey === 'amount-desc') return b.amount - a.amount;
      if (sortKey === 'amount-asc') return a.amount - b.amount;
      return 0;
    });

    return result;
  }, [expenses, searchTerm, selectedCategory, sortKey]);

  // Pagination helper
  const totalPages = Math.ceil(processedExpenses.length / itemsPerPage) || 1;
  const paginatedExpenses = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedExpenses.slice(start, start + itemsPerPage);
  }, [processedExpenses, currentPage]);

  const handleOpenAddModal = () => {
    setTxCategory('Groceries');
    setTxAmount('');
    setTxDate(new Date().toISOString().split('T')[0]);
    setTxDesc('');
    setTxMethod('Apple Pay (Chase Visa)');
    setUploadedFileName('');
    setShowAddModal(true);
  };

  const handleOpenEditModal = (tx: Transaction) => {
    setShowEditModal(tx);
    setTxCategory(tx.category);
    setTxAmount(tx.amount.toString());
    setTxDate(tx.date);
    setTxDesc(tx.description);
    setTxMethod(tx.paymentMethod);
  };

  // Submit new expense
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txAmount || isNaN(parseFloat(txAmount)) || parseFloat(txAmount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    addTransaction({
      type: 'expense',
      category: txCategory,
      amount: parseFloat(txAmount),
      date: txDate,
      description: txDesc || `${txCategory} Expense`,
      paymentMethod: txMethod,
      status: 'completed',
      receiptUrl: uploadedFileName ? '#' : undefined
    });

    setShowAddModal(false);
  };

  // Save changes on existing expense
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showEditModal) return;
    if (!txAmount || isNaN(parseFloat(txAmount)) || parseFloat(txAmount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    editTransaction({
      ...showEditModal,
      category: txCategory,
      amount: parseFloat(txAmount),
      date: txDate,
      description: txDesc,
      paymentMethod: txMethod
    });

    setShowEditModal(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this transaction from your portfolio database?")) {
      deleteTransaction(id);
      setActiveDetailTx(null);
    }
  };

  // Drag-and-drop OCR simulation
  const handleReceiptFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    simulateOcrText();
  };

  const handleReceiptFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      simulateOcrText();
    }
  };

  const simulateOcrText = () => {
    setIsUploading(true);
    setUploadedFileName("checking_invoice_trader_joes.pdf");

    setTimeout(() => {
      // Auto-populate form based on simulation!
      setTxCategory("Groceries");
      setTxAmount("88.20");
      setTxDesc("Trader Joe's Chelsea Invoice");
      setTxMethod("Apple Pay (Chase Visa)");
      setTxDate("2026-07-12");
      setIsUploading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6" id="expenses-page">

      {/* Title Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4" id="expenses-header">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">Expense Management</h1>
          <p className="text-xs text-gray-400 dark:text-zinc-500 mt-0.5">Audit, sort, filter, and upload attachments to track discretionary outgoings.</p>
        </div>
        <button
          id="expenses-add-new-btn"
          onClick={handleOpenAddModal}
          className="self-start sm:self-center flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md hover:shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <Plus className="h-4.5 w-4.5" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Filter Toolbar controls */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-gray-200/50 dark:border-zinc-850 shadow-sm flex flex-col md:flex-row items-center gap-4" id="expenses-filters-toolbar">
        {/* Search */}
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
          <input
            id="expenses-search-input"
            type="text"
            placeholder="Search by merchant, description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-gray-50 dark:bg-zinc-950/80 border border-gray-250 dark:border-zinc-800 rounded-xl text-xs outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 text-gray-900 dark:text-white"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            id="expenses-category-select"
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
            className="h-10 px-3 py-1 bg-gray-50 dark:bg-zinc-950/80 border border-gray-250 dark:border-zinc-800 rounded-xl text-xs outline-none text-gray-800 dark:text-zinc-300 cursor-pointer"
          >
            <option value="All">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Sort Trigger */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <ArrowUpDown className="h-4 w-4 text-gray-400" />
          <select
            id="expenses-sort-select"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as any)}
            className="h-10 px-3 py-1 bg-gray-50 dark:bg-zinc-950/80 border border-gray-250 dark:border-zinc-800 rounded-xl text-xs outline-none text-gray-800 dark:text-zinc-300 cursor-pointer"
          >
            <option value="date-desc">Newest Date First</option>
            <option value="date-asc">Oldest Date First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Ledger Table Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200/50 dark:border-zinc-850 shadow-sm overflow-hidden" id="expenses-table-container">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="expenses-ledger-table">
            <thead>
              <tr className="border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/60 text-[10px] font-mono font-bold text-gray-400 dark:text-zinc-500 uppercase">
                <th className="py-3 px-6">Description</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Payment Method</th>
                <th className="py-3 px-6 text-right">Amount</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-zinc-850">
              {paginatedExpenses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-gray-400 dark:text-zinc-500">
                    No expense records match your search criteria.
                  </td>
                </tr>
              ) : (
                paginatedExpenses.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-gray-50/50 dark:hover:bg-zinc-850/35 transition-colors cursor-pointer group"
                    onClick={() => setActiveDetailTx(tx)}
                    id={`expense-row-${tx.id}`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-[180px]">{tx.description}</span>
                        {tx.receiptUrl && (
                          <span title="Receipt attached">
                            <Paperclip className="h-3 w-3 text-indigo-500" />
                          </span>
                        )}
                        {tx.status === 'pending' && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 bg-yellow-50 dark:bg-yellow-950/20 text-yellow-500 rounded-full font-bold">PENDING</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs text-gray-600 dark:text-zinc-300 font-sans">{tx.category}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs text-gray-500 dark:text-zinc-400 font-mono">{tx.date}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-xs text-gray-500 dark:text-zinc-400 font-sans">{tx.paymentMethod}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-xs font-bold font-mono text-gray-950 dark:text-white">-${tx.amount.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          id={`expense-edit-${tx.id}`}
                          onClick={() => handleOpenEditModal(tx)}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-zinc-800 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          id={`expense-delete-${tx.id}`}
                          onClick={() => handleDelete(tx.id)}
                          className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="p-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between text-xs text-gray-500" id="expenses-pagination">
          <span>Page {currentPage} of {totalPages} ({processedExpenses.length} transactions)</span>
          <div className="flex items-center gap-2">
            <button
              id="expenses-page-prev"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="p-1.5 bg-gray-50 dark:bg-zinc-850 hover:bg-gray-100 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-500 dark:text-zinc-400 disabled:opacity-50 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              id="expenses-page-next"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="p-1.5 bg-gray-50 dark:bg-zinc-850 hover:bg-gray-100 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-500 dark:text-zinc-400 disabled:opacity-50 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* DIALOG MODAL: ADD EXPENSE WITH RECEIPT UPLOAD OCR */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm" id="expenses-add-modal-overlay">
            <motion.div
              id="expenses-add-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 border border-gray-250 dark:border-zinc-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden font-sans grid grid-cols-1 md:grid-cols-12"
            >

              {/* Receipt Upload/Ocr Panel on Left */}
              <div className="md:col-span-5 bg-slate-50 dark:bg-zinc-950/40 p-6 border-r border-gray-100 dark:border-zinc-800/80 flex flex-col justify-between" id="receipt-upload-sidebar">
                <div>
                  <div className="flex items-center gap-1 text-[10px] text-indigo-500 font-mono tracking-widest font-bold uppercase mb-2">
                    <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                    <span>FinPilot OCR Engine</span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">Instant Receipt Parsing</h4>
                  <p className="text-[11px] text-gray-400 leading-normal mt-1 font-sans">
                    Drop your invoice pdf or screenshot. Our AI will extract the merchant, tax category, amount, and auto-populate the log!
                  </p>
                </div>

                {/* Upload drag drop box */}
                <div
                  id="receipt-drop-zone"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleReceiptFileDrop}
                  className="border-2 border-dashed border-gray-250 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-500/50 p-4 rounded-xl text-center bg-white dark:bg-zinc-900/60 transition-all flex flex-col items-center justify-center min-h-[140px] relative cursor-pointer"
                >
                  <input
                    id="receipt-file-picker"
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleReceiptFileSelect}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-7 w-7 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-[10px] font-semibold text-gray-500">Reading line-items...</span>
                    </div>
                  ) : uploadedFileName ? (
                    <div className="flex flex-col items-center gap-1.5">
                      <FileCheck2 className="h-7 w-7 text-emerald-500" />
                      <span className="text-[10px] font-bold text-emerald-500 truncate max-w-[130px]">{uploadedFileName}</span>
                      <span className="text-[9px] text-gray-400">Success! Fields filled.</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <UploadCloud className="h-7 w-7 text-gray-400" />
                      <span className="text-[11px] font-semibold text-gray-600 dark:text-zinc-300 mt-2">Drag file here</span>
                      <span className="text-[9px] text-gray-450 mt-0.5">Or tap to browse</span>
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-gray-400 font-mono flex items-center gap-1.5 mt-4">
                  <span>OCR Version: FP-2026.01</span>
                </div>
              </div>

              {/* Expense Input form on Right */}
              <div className="md:col-span-7 p-6 flex flex-col justify-between" id="receipt-add-form-wrapper">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800">
                  <h3 className="font-sans font-bold text-base text-gray-950 dark:text-white">Expense Attributes</h3>
                  <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer">
                    <X className="h-4.5 w-4.5 text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
                  {/* Amount */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="expense-amount-input">Amount ({userProfile.currency})</label>
                    <input
                      id="expense-amount-input"
                      type="number"
                      step="0.01"
                      min="0.01"
                      required
                      placeholder="0.00"
                      value={txAmount}
                      onChange={(e) => setTxAmount(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-sm font-bold outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 text-gray-900 dark:text-white"
                    />
                  </div>

                  {/* Grid fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="expense-category-input">Category</label>
                      <select
                        id="expense-category-input"
                        value={txCategory}
                        onChange={(e) => setTxCategory(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 text-gray-900 dark:text-white cursor-pointer"
                      >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="expense-date-input">Date</label>
                      <input
                        id="expense-date-input"
                        type="date"
                        required
                        value={txDate}
                        onChange={(e) => setTxDate(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="expense-desc-input">Description</label>
                    <input
                      id="expense-desc-input"
                      type="text"
                      placeholder="Merchant name, items purchased..."
                      value={txDesc}
                      onChange={(e) => setTxDesc(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 text-gray-900 dark:text-white"
                    />
                  </div>

                  {/* Method */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="expense-method-input">Payment Method</label>
                    <select
                      id="expense-method-input"
                      value={txMethod}
                      onChange={(e) => setTxMethod(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 text-gray-900 dark:text-white cursor-pointer"
                    >
                      {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>

                  <button
                    id="submit-expense-form-btn"
                    type="submit"
                    className="w-full h-10 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Log Expense Entry</span>
                  </button>
                </form>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DIALOG MODAL: EDIT EXPENSE */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm" id="expenses-edit-modal-overlay">
            <motion.div
              id="expenses-edit-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 border border-gray-250 dark:border-zinc-800 rounded-3xl w-full max-w-md shadow-2xl p-6 font-sans"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800">
                <h3 className="font-sans font-bold text-base text-gray-950 dark:text-white">Edit Expense Detail</h3>
                <button onClick={() => setShowEditModal(null)} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer">
                  <X className="h-4.5 w-4.5 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
                {/* Amount */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="edit-expense-amount">Amount ({userProfile.currency})</label>
                  <input
                    id="edit-expense-amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    value={txAmount}
                    onChange={(e) => setTxAmount(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-sm font-bold outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="edit-expense-category">Category</label>
                  <select
                    id="edit-expense-category"
                    value={txCategory}
                    onChange={(e) => setTxCategory(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 text-gray-900 dark:text-white cursor-pointer"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="edit-expense-date">Date</label>
                  <input
                    id="edit-expense-date"
                    type="date"
                    required
                    value={txDate}
                    onChange={(e) => setTxDate(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="edit-expense-desc">Description</label>
                  <input
                    id="edit-expense-desc"
                    type="text"
                    required
                    value={txDesc}
                    onChange={(e) => setTxDesc(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Method */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="edit-expense-method">Payment Method</label>
                  <select
                    id="edit-expense-method"
                    value={txMethod}
                    onChange={(e) => setTxMethod(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 text-gray-900 dark:text-white cursor-pointer"
                  >
                    {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                <button
                  id="save-edited-expense-btn"
                  type="submit"
                  className="w-full h-10 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DRAWER SIDEBAR OVERLAY: EXPENSE DETAIL VIEW */}
      <AnimatePresence>
        {activeDetailTx && (
          <div className="fixed inset-0 z-50 flex justify-end bg-zinc-950/60 backdrop-blur-sm" id="expenses-details-overlay">
            <motion.div
              id="expenses-details-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white dark:bg-zinc-900 h-full w-full max-w-md shadow-2xl overflow-y-auto flex flex-col justify-between p-6 font-sans"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800">
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">TRANSACTION ATTRIBUTES</span>
                  <button onClick={() => setActiveDetailTx(null)} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer">
                    <X className="h-5 w-5 text-gray-450" />
                  </button>
                </div>

                <div className="text-center py-6 bg-slate-50 dark:bg-zinc-950/40 rounded-3xl border border-gray-150 dark:border-zinc-850">
                  <div className="h-12 w-12 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Receipt className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white max-w-[200px] mx-auto truncate">{activeDetailTx.description}</h3>
                  <span className="text-2xl font-extrabold font-mono text-gray-950 dark:text-white mt-2 block">-${activeDetailTx.amount.toFixed(2)}</span>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 rounded-full font-semibold uppercase mt-3 inline-block">COMPLETED SECURE</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-1 border-b border-gray-50 dark:border-zinc-850/40 text-xs">
                    <span className="text-gray-400 font-sans">Transaction Category</span>
                    <span className="font-semibold text-gray-800 dark:text-zinc-200">{activeDetailTx.category}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-gray-50 dark:border-zinc-850/40 text-xs">
                    <span className="text-gray-400 font-sans">Effective Booking Date</span>
                    <span className="font-mono text-gray-800 dark:text-zinc-200">{activeDetailTx.date}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-gray-50 dark:border-zinc-850/40 text-xs">
                    <span className="text-gray-400 font-sans">Settlement Channel</span>
                    <span className="font-semibold text-gray-800 dark:text-zinc-200">{activeDetailTx.paymentMethod}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-gray-50 dark:border-zinc-850/40 text-xs">
                    <span className="text-gray-400 font-sans">Cryptographic ID</span>
                    <span className="font-mono text-[10px] text-zinc-500">{activeDetailTx.id}</span>
                  </div>
                </div>

                {/* Receipt Preview if exists */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wide">Receipt Attachment</span>
                  <div className="bg-slate-50 dark:bg-zinc-950/60 rounded-2xl border border-gray-250 dark:border-zinc-800 p-4 text-center">
                    <Receipt className="h-10 w-10 text-indigo-500/80 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">invoice_receipt_scan.pdf</p>
                    <p className="text-[10px] text-gray-450 mt-1 font-sans">Attached and securely archived under crypt-vault.</p>
                  </div>
                </div>
              </div>

              {/* Action operations in drawer */}
              <div className="flex gap-3 border-t border-gray-100 dark:border-zinc-800 pt-4 mt-6">
                <button
                  id="drawer-edit-btn"
                  onClick={() => { handleOpenEditModal(activeDetailTx); setActiveDetailTx(null); }}
                  className="flex-1 py-3 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-750 text-gray-800 dark:text-zinc-200 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Modify</span>
                </button>
                <button
                  id="drawer-delete-btn"
                  onClick={() => handleDelete(activeDetailTx.id)}
                  className="flex-1 py-3 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/30 text-red-500 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
