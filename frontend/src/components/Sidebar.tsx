import { useApp } from './AppContext';
import {
  LayoutDashboard,
  Receipt,
  Coins,
  PiggyBank,
  BarChart3,
  MessageSquareText,
  Settings,
  Bell,
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const { currentView, setCurrentView, logout, userProfile, alerts } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const unreadAlertsCount = alerts.filter(a => !a.read).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'income', label: 'Income Hub', icon: Coins },
    { id: 'budget', label: 'Budgets & Goals', icon: PiggyBank },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'assistant', label: 'FinPilot AI', icon: MessageSquareText, highlight: true },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadAlertsCount },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div
      id="sidebar-container"
      className={`hidden md:flex flex-col h-screen bg-white dark:bg-zinc-950 border-r border-gray-200/50 dark:border-zinc-800/80 transition-all duration-300 relative ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Collapse Toggle */}
      <button
        id="sidebar-collapse-toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-800 p-1 rounded-full shadow-sm text-gray-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer z-50"
      >
        {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>

      {/* Brand Logo */}
      <div className={`p-6 flex items-center gap-3 border-b border-gray-100 dark:border-zinc-900/50 ${isCollapsed ? 'justify-center' : ''}`} id="sidebar-logo">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/10 shrink-0">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="font-sans font-bold tracking-tight text-gray-900 dark:text-white text-base leading-none">FinPilot AI</span>
            <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-mono tracking-wider font-semibold uppercase mt-0.5">PLATFORM</span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto" id="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              id={`nav-item-${item.id}`}
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 relative group cursor-pointer ${
                isActive
                  ? 'bg-zinc-900 dark:bg-zinc-800 text-white font-medium shadow-sm'
                  : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-900/60'
              } ${item.highlight && !isActive ? 'border border-indigo-500/20 bg-indigo-50/20 dark:bg-indigo-950/10' : ''}`}
            >
              <Icon className={`h-5 w-5 shrink-0 transition-transform group-hover:scale-105 ${
                isActive ? 'text-white' : item.highlight ? 'text-indigo-500' : 'text-gray-400 dark:text-zinc-400'
              }`} />

              {!isCollapsed && (
                <span className="font-sans text-sm tracking-tight flex-1 text-left">
                  {item.label}
                </span>
              )}

              {/* Notification Badges / Hotspots */}
              {item.badge !== undefined && item.badge > 0 && (
                <span className={`flex items-center justify-center text-[10px] font-mono font-bold leading-none shrink-0 ${
                  isCollapsed ? 'absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500' : 'h-5 min-w-5 px-1 rounded-full bg-red-500 text-white'
                }`}>
                  {isCollapsed ? '' : item.badge}
                </span>
              )}

              {/* Hover Pill for Collapsed State */}
              {isCollapsed && (
                <div className="absolute left-16 scale-0 group-hover:scale-100 transition-all origin-left bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl font-sans tracking-wide pointer-events-none z-50 whitespace-nowrap">
                  {item.label}
                  {item.badge ? ` (${item.badge})` : ''}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* User profile section at the bottom */}
      <div className="p-4 border-t border-gray-100 dark:border-zinc-900/50" id="sidebar-footer">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <img
            id="sidebar-user-avatar"
            src={userProfile.avatarUrl}
            alt={userProfile.name}
            className="h-9 w-9 rounded-full object-cover ring-2 ring-gray-100 dark:ring-zinc-800"
          />
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-sans text-sm font-semibold text-gray-900 dark:text-white truncate leading-tight">{userProfile.name}</p>
              <p className="font-mono text-[10px] text-gray-400 truncate mt-0.5">{userProfile.email}</p>
            </div>
          )}
          {!isCollapsed && (
            <button
              id="sidebar-logout-button"
              onClick={logout}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
              title="Log Out"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          )}
        </div>
        {isCollapsed && (
          <button
            id="sidebar-logout-collapsed"
            onClick={logout}
            className="w-full flex justify-center mt-3 p-2 hover:bg-red-50 dark:hover:bg-red-950/20 text-gray-400 hover:text-red-500 rounded-xl transition-all cursor-pointer"
            title="Log Out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
