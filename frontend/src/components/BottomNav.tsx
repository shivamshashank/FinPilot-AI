import { useApp } from './AppContext';
import {
  LayoutDashboard,
  Receipt,
  PiggyBank,
  MessageSquareText,
  Settings,
  Bell
} from 'lucide-react';

export default function BottomNav() {
  const { currentView, setCurrentView, alerts } = useApp();

  const unreadAlertsCount = alerts.filter(a => !a.read).length;

  const mobileItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'assistant', label: 'FinPilot AI', icon: MessageSquareText, highlight: true },
    { id: 'budget', label: 'Budgets', icon: PiggyBank },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div
      id="bottom-navigation-container"
      className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/80 dark:bg-zinc-950/90 backdrop-blur-lg border-t border-gray-200/50 dark:border-zinc-800/80 px-4 flex items-center justify-around z-50 shadow-lg"
    >
      {mobileItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;

        return (
          <button
            id={`bottom-nav-${item.id}`}
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center justify-center min-w-11 min-h-11 rounded-xl transition-all relative ${
              isActive
                ? 'text-indigo-500 dark:text-indigo-400 font-medium scale-105'
                : 'text-gray-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            {item.highlight ? (
              <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 text-white p-2.5 rounded-full -mt-5 shadow-md shadow-indigo-500/20 ring-4 ring-white dark:ring-zinc-950">
                <Icon className="h-5 w-5" />
              </div>
            ) : (
              <Icon className="h-5.5 w-5.5" />
            )}

            <span className={`text-[10px] font-sans tracking-tight mt-1 ${item.highlight ? 'font-medium mt-2' : ''}`}>
              {item.label}
            </span>

            {/* Notification Badge on Settings / Bell */}
            {item.id === 'settings' && unreadAlertsCount > 0 && (
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
            )}
          </button>
        );
      })}
    </div>
  );
}
