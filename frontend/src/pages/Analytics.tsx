import { useApp } from '../components/AppContext';
import { 
  TrendingUp, 
  Sparkles, 
  DownloadCloud, 
  CheckCircle2, 
  HelpCircle, 
  BarChart4, 
  PieChart as LucidePieChart, 
  Calendar,
  Layers,
  Zap
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { MOCK_CHART_MONTHLY, MOCK_CHART_CASHFLOW, MOCK_CHART_CATEGORIES, MOCK_HEATMAP } from '../mockData';

export default function Analytics() {
  const { userProfile, transactions } = useApp();
  const [activeReportMonth, setActiveReportMonth] = useState('July 2026');
  const [isExporting, setIsExporting] = useState(false);

  const handleExportMockReport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`Success: Your FinPilot Monthly Cryptographic Ledger PDF Report for ${activeReportMonth} has been compiled and downloaded successfully.`);
    }, 1800);
  };

  const getIntensityClass = (value: number) => {
    if (value === 0) return 'bg-gray-100 dark:bg-zinc-900 text-transparent';
    if (value < 20) return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400';
    if (value < 50) return 'bg-indigo-500/30 text-indigo-700 dark:text-indigo-300';
    if (value < 150) return 'bg-indigo-500/60 text-white';
    return 'bg-indigo-600 text-white font-bold';
  };

  return (
    <div className="space-y-6" id="analytics-page">
      
      {/* Title block with Export action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4" id="analytics-header">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">Wealth Analytics</h1>
          <p className="text-xs text-gray-400 dark:text-zinc-500 mt-0.5">Predictive forecasting models, daily spend density maps, and category velocity indexes.</p>
        </div>
        
        <button
          id="export-pdf-report-btn"
          disabled={isExporting}
          onClick={handleExportMockReport}
          className="self-start sm:self-center flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md disabled:opacity-50 transition-all cursor-pointer"
        >
          {isExporting ? (
            <div className="h-4.5 w-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <DownloadCloud className="h-4.5 w-4.5" />
          )}
          <span>{isExporting ? 'Compiling Report...' : 'Export Monthly Ledger'}</span>
        </button>
      </div>

      {/* Financial Health Score & Ratio metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="analytics-health-score-row">
        
        {/* Gauge Metric Card (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-200/50 dark:border-zinc-850 shadow-sm flex flex-col justify-between" id="score-gauge-card">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 dark:text-zinc-500 font-mono font-bold uppercase">FINANCIAL HEALTH DEEP DIVE</span>
              <HelpCircle className="h-4 w-4 text-gray-350 cursor-pointer" />
            </div>

            {/* Visual Ring presentation */}
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative h-36 w-36 rounded-full border-4 border-slate-100 dark:border-zinc-800 flex items-center justify-center">
                {/* Simulated colorful progress boundary */}
                <div className="absolute inset-[-4px] rounded-full border-4 border-transparent border-t-indigo-500 border-r-indigo-500 border-l-indigo-400 rotate-45" />
                
                <div className="text-center">
                  <span className="text-4xl font-extrabold text-gray-950 dark:text-white font-mono">{userProfile.financialScore}</span>
                  <span className="text-xs text-gray-400 dark:text-zinc-500 block mt-0.5">GRADE: STABLE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3.5 border-t border-gray-50 dark:border-zinc-850/50 pt-4" id="score-deep-dive-ratios">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">July Savings Rate</span>
              <span className="font-semibold text-emerald-500 font-mono">34.2%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Total Debt to Capital Ratio</span>
              <span className="font-semibold text-gray-800 dark:text-zinc-300 font-mono">12.1%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Budget Limit Compliance</span>
              <span className="font-semibold text-indigo-500 font-mono">94%</span>
            </div>
          </div>
        </div>

        {/* AI Analytics Critic Insights Panel (7 cols) */}
        <div className="lg:col-span-7 bg-zinc-950 dark:bg-zinc-900 p-6 rounded-3xl text-white flex flex-col justify-between shadow-xl relative overflow-hidden" id="analytics-ai-insights">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 rounded-full bg-pink-500/10 blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-1.5 text-[10px] text-indigo-400 font-mono tracking-widest font-bold uppercase">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>FinPilot Predictive Model Insights</span>
            </div>

            <div className="space-y-5 mt-6" id="ai-insights-list">
              <div className="flex gap-3.5 items-start">
                <div className="h-7 w-7 bg-white/10 text-emerald-400 rounded-lg flex items-center justify-center shrink-0">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Freelance Outperformance</p>
                  <p className="text-[11px] text-zinc-400 leading-normal mt-0.5">Your freelance yields ($1,250.00 this week) represent a 14% increase in liquidity velocity. Classifying 70% under asset reserves will secure savings target completion 19 days ahead of schedules.</p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="h-7 w-7 bg-white/10 text-indigo-400 rounded-lg flex items-center justify-center shrink-0">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Consolidation Opportunities</p>
                  <p className="text-[11px] text-zinc-400 leading-normal mt-0.5">We flagged $48.99 of Software SaaS charges across three distinct subscription lines. Consolidating Linear and ChatGPT limits onto family plans recovers $45.00/month.</p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="h-7 w-7 bg-white/10 text-amber-400 rounded-lg flex items-center justify-center shrink-0">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Predictive Budget Calibrations</p>
                  <p className="text-[11px] text-zinc-400 leading-normal mt-0.5">Adjusting your discretionary Shopping limits downward by 15% during summer months ensures your energy utilities spike does not drag your overall Wealth Score down.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Grid: 2 Large Chart widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="analytics-charts-grid">
        
        {/* Chart 1: Cash Flow Area */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-200/50 dark:border-zinc-850 shadow-sm" id="analytics-cashflow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-sans font-bold text-base text-gray-950 dark:text-white">Active Cash Flow Velocity</h3>
              <p className="text-xs text-gray-400 mt-0.5">Tracking immediate checking pool vs overall net assets.</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_CASHFLOW} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#71717a' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#71717a' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(9, 9, 11, 0.95)', 
                    borderColor: 'rgba(39, 39, 42, 0.8)',
                    color: '#fff',
                    borderRadius: '12px',
                    fontSize: '11px',
                  }} 
                />
                <Area type="monotone" dataKey="NetWorth" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorNetWorth)" />
                <Area type="monotone" dataKey="Cash" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCash)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Monthly Spends Multi-bars */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-200/50 dark:border-zinc-850 shadow-sm" id="analytics-income-expense-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-sans font-bold text-base text-gray-950 dark:text-white">Historical Budget Leverage</h3>
              <p className="text-xs text-gray-400 mt-0.5">Comparing total monthly cash deposits against outgoings.</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_CHART_MONTHLY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#71717a' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#71717a' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(9, 9, 11, 0.95)', 
                    borderColor: 'rgba(39, 39, 42, 0.8)',
                    color: '#fff',
                    borderRadius: '12px',
                    fontSize: '11px',
                  }} 
                />
                <Legend verticalAlign="top" height={32} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="Income" fill="#10b981" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Expense" fill="#f43f5e" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Row: Heatmap spending density & categories analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="analytics-heatmap-distribution-row">
        
        {/* Heatmap intensity grid (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-200/50 dark:border-zinc-850 shadow-sm flex flex-col justify-between animate-fade-in" id="heatmap-intensity-card">
          <div>
            <h3 className="font-sans font-bold text-base text-gray-950 dark:text-white">Daily Spending Density</h3>
            <p className="text-xs text-gray-400 mt-0.5">Grid representation identifying calendar transaction intensity.</p>
          </div>

          <div className="my-6 grid grid-cols-5 gap-3 max-w-lg mx-auto" id="heatmap-grid">
            <div className="col-span-1 flex flex-col justify-between text-xs font-mono text-gray-400 py-1.5 pr-2 border-r border-gray-100 dark:border-zinc-800 shrink-0">
              {["Mon", "Wed", "Fri", "Sun"].map((day) => <span key={day}>{day}</span>)}
            </div>
            
            <div className="col-span-4 grid grid-cols-4 gap-2" id="heatmap-weeks">
              {/* Representing weeks */}
              {Array.from({ length: 4 }).map((_, weekIdx) => (
                <div key={weekIdx} className="space-y-1.5 flex flex-col">
                  <span className="text-[9px] font-mono font-bold text-gray-300 dark:text-zinc-650 text-center block mb-1">WK {weekIdx+1}</span>
                  {MOCK_HEATMAP.map((item, dayIdx) => {
                    // Extract week value
                    const keyName = `week${weekIdx + 1}` as 'week1' | 'week2' | 'week3' | 'week4';
                    const val = item[keyName];

                    return (
                      <div 
                        key={dayIdx} 
                        className={`h-7 rounded-lg transition-all flex items-center justify-center text-[10px] font-mono cursor-pointer hover:ring-2 hover:ring-indigo-500 hover:scale-105 ${getIntensityClass(val)}`}
                        title={`${item.day} Week ${weekIdx+1}: $${val} spent`}
                      >
                        {val > 0 ? `$${val.toFixed(0)}` : ''}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 text-[10px] font-mono border-t border-gray-50 dark:border-zinc-850/50 pt-4" id="heatmap-legend">
            <span className="text-gray-400">Transaction intensity:</span>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-6 bg-gray-100 dark:bg-zinc-900 rounded-md" /> <span className="text-gray-450">None</span>
              <span className="h-3 w-6 bg-indigo-500/10 rounded-md" /> <span className="text-gray-450">&lt;$20</span>
              <span className="h-3 w-6 bg-indigo-500/30 rounded-md" /> <span className="text-gray-450">&lt;$50</span>
              <span className="h-3 w-6 bg-indigo-500/60 rounded-md" /> <span className="text-gray-450">&lt;$150</span>
              <span className="h-3 w-6 bg-indigo-600 rounded-md" /> <span className="text-gray-450">$150+</span>
            </div>
          </div>
        </div>

        {/* Dynamic Category Analysis (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-200/50 dark:border-zinc-850 shadow-sm flex flex-col justify-between" id="category-velocity-card">
          <div>
            <h3 className="font-sans font-bold text-base text-gray-950 dark:text-white">Categorical Spend Share</h3>
            <p className="text-xs text-gray-400 mt-0.5">Distribution composition based on actual outgoings ledger.</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center relative my-4" id="analytics-categories-pie">
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
                  data={MOCK_CHART_CATEGORIES}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={68}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {MOCK_CHART_CATEGORIES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5" id="analytics-categories-legend">
            {MOCK_CHART_CATEGORIES.slice(0, 4).map((item) => (
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

    </div>
  );
}
