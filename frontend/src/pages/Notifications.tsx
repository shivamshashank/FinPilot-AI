import { useApp } from '../components/AppContext';
import {
  Bell,
  Trash2,
  Check,
  AlertTriangle,
  Info,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Notifications() {
  const { alerts, markAlertAsRead, markAllAlertsAsRead: clearAllAlerts } = useApp();

  const unreadCount = useMemo(() => {
    return alerts.filter(a => !a.read).length;
  }, [alerts]);

  const getAlertIcon = (type: string) => {
    if (type === 'warning') return AlertTriangle;
    if (type === 'success') return CheckCircle2;
    return Info;
  };

  const getAlertColor = (type: string) => {
    if (type === 'warning') return 'text-amber-500 bg-amber-50 dark:bg-amber-950/20 border-amber-250/20';
    if (type === 'success') return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-250/20';
    return 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 border-indigo-250/20';
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto" id="notifications-page">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4" id="notifications-header">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">Notification Vault</h1>
          <p className="text-xs text-gray-400 dark:text-zinc-500 mt-0.5 font-sans">Audit budget alarms, security confirmations, and co-pilot strategy alerts.</p>
        </div>

        <div className="flex items-center gap-2">
          {alerts.length > 0 && (
            <button
              id="clear-all-alerts-btn"
              onClick={clearAllAlerts}
              className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-250 dark:border-zinc-800 text-gray-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-500 text-xs font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-850 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear Vault</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200/50 dark:border-zinc-850 shadow-sm overflow-hidden" id="notifications-list-wrapper">
        <div className="p-5 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-900 dark:text-white font-sans">All Notifications</span>
            {unreadCount > 0 && (
              <span className="text-[10px] font-mono font-bold bg-indigo-500 text-white px-2 py-0.5 rounded-full">
                {unreadCount} NEW ALERT{unreadCount > 1 ? 'S' : ''}
              </span>
            )}
          </div>
        </div>

        <div className="divide-y divide-gray-50 dark:divide-zinc-850" id="notifications-ledger">
          {alerts.length === 0 ? (
            <div className="py-16 text-center text-xs text-gray-400 dark:text-zinc-500">
              <Bell className="h-10 w-10 text-gray-300 dark:text-zinc-850 mx-auto mb-3" />
              <span>All notifications cleared. Your wealth pipeline is quiet.</span>
            </div>
          ) : (
            <AnimatePresence>
              {alerts.map((alert) => {
                const Icon = getAlertIcon(alert.type);
                const colorClasses = getAlertColor(alert.type);

                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`p-5 flex items-start justify-between gap-4 transition-all ${
                      alert.read ? 'opacity-70' : 'bg-indigo-50/5 dark:bg-indigo-950/5'
                    }`}
                    id={`alert-card-${alert.id}`}
                  >
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className={`h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 ${colorClasses}`}>
                        <Icon className="h-5 w-5" />
                      </div>

                      {/* Content */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-gray-900 dark:text-white font-sans">{alert.title}</p>
                          {!alert.read && (
                            <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-zinc-400 leading-normal max-w-xl font-sans">{alert.description}</p>
                        <span className="text-[9px] text-gray-400 font-mono block pt-1">{new Date(alert.timestamp).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Action */}
                    {!alert.read && (
                      <button
                        id={`mark-read-${alert.id}`}
                        onClick={() => markAlertAsRead(alert.id)}
                        className="p-1.5 bg-gray-50 dark:bg-zinc-850 hover:bg-indigo-50 dark:hover:bg-zinc-800 text-gray-400 hover:text-indigo-500 rounded-lg transition-colors cursor-pointer shrink-0"
                        title="Mark as Read"
                      >
                        <Check className="h-4.5 w-4.5" />
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* AI Recommendation banner inside alerts */}
      <div className="bg-zinc-950 dark:bg-zinc-900 border-2 border-indigo-500 p-6 rounded-3xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl" id="notifications-ai-callout">
        <div>
          <div className="flex items-center gap-1 text-[10px] text-indigo-400 font-mono tracking-widest font-bold uppercase">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span>FinPilot Daily Intelligence Report</span>
          </div>
          <h3 className="text-sm font-bold text-white mt-3 font-sans">Automated Weekly Compliance Audit Compiled</h3>
          <p className="text-[11px] text-zinc-400 mt-1 max-w-xl leading-relaxed font-sans">We analyzed your spending velocity for July 2026. All limits are fully complaint with no critical risk items. We recommend reviewing your investment allocations before July 31.</p>
        </div>
        <button
          id="alerts-ai-action"
          onClick={() => alert("Forwarding to Analytics Hub")}
          className="px-4 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <span>View Analytics</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
}
