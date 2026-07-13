import React, { useState } from 'react';
import { useApp } from '../components/AppContext';
import { useTheme } from '../components/ThemeContext';
import { 
  User, 
  Settings as LucideSettings, 
  Bell, 
  ShieldCheck, 
  Lock, 
  Trash2, 
  Download, 
  CheckCircle2, 
  Sun, 
  Moon, 
  Laptop, 
  Check, 
  AlertOctagon, 
  Sparkles 
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Settings() {
  const { userProfile, updateProfile, logout } = useApp();
  const { theme, setTheme } = useTheme();

  // Tab state
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'connected' | 'danger'>('profile');

  // Form profile states
  const [pName, setPName] = useState(userProfile.name);
  const [pEmail, setPEmail] = useState(userProfile.email);
  const [pPhone, setPPhone] = useState(userProfile.phone);
  const [pCurrency, setPCurrency] = useState(userProfile.currency);

  const [notifBudget, setNotifBudget] = useState(userProfile.notificationPreferences.budgetAlerts);
  const [notifAi, setNotifAi] = useState(userProfile.notificationPreferences.aiInsights);
  const [notifWeekly, setNotifWeekly] = useState(userProfile.notificationPreferences.weeklyReports);
  const [notifSecurity, setNotifSecurity] = useState(userProfile.notificationPreferences.securityAlerts);

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: pName,
      email: pEmail,
      phone: pPhone,
      currency: pCurrency,
      notificationPreferences: {
        budgetAlerts: notifBudget,
        aiInsights: notifAi,
        weeklyReports: notifWeekly,
        securityAlerts: notifSecurity
      }
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleExportDataSimulation = () => {
    alert("Export Triggered: Compiling all ledger transactions, budget allocations, and wealth logs into finpilot_ledger_export.json. Download will start automatically.");
  };

  const handleDeleteAccountSimulation = () => {
    if (confirm("CRITICAL WARNING: Are you sure you want to permanently delete your FinPilot AI account? This will scrub your local bank caches, transactions database, and credentials. This action is irreversible.")) {
      localStorage.clear();
      logout();
    }
  };

  return (
    <div className="space-y-6" id="settings-page">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">Workspace Settings</h1>
        <p className="text-xs text-gray-400 dark:text-zinc-500 mt-0.5 font-sans">Manage your personal profiles, toggle preferences, audit linked accounts, and secure credentials.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start" id="settings-body-wrapper">
        
        {/* Left Side settings navigator tabs (3 cols) */}
        <div className="md:col-span-3 space-y-1 bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-gray-200/50 dark:border-zinc-850" id="settings-tabs">
          {[
            { id: 'profile', label: 'My Profile', icon: User },
            { id: 'notifications', label: 'Notification Preferences', icon: Bell },
            { id: 'connected', label: 'Connected Accounts', icon: ShieldCheck },
            { id: 'danger', label: 'Privacy & Data Protection', icon: AlertOctagon }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                id={`settings-tab-${tab.id}`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-950 dark:bg-zinc-800 text-white shadow-sm'
                    : 'text-gray-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-950/40'
                }`}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side Settings Panel wrapper (9 cols) */}
        <div className="md:col-span-9 bg-white dark:bg-zinc-900 border border-gray-200/50 dark:border-zinc-850 p-6 rounded-3xl shadow-sm min-h-[400px]" id="settings-panel-content">
          
          {/* TAB 1: PROFILE ATTRIBUTES */}
          {activeTab === 'profile' && (
            <form id="settings-profile-form" onSubmit={handleSaveProfile} className="space-y-6">
              <div className="border-b border-gray-100 dark:border-zinc-850 pb-4">
                <h3 className="font-sans font-bold text-base text-gray-950 dark:text-white">Profile Attributes</h3>
                <p className="text-xs text-gray-400 mt-1">Configure your personal billing details and preferred currency.</p>
              </div>

              {/* Avatar upload segment */}
              <div className="flex items-center gap-4">
                <img src={userProfile.avatarUrl} alt={userProfile.name} className="h-14 w-14 rounded-full object-cover border border-gray-250 ring-2 ring-gray-100 dark:ring-zinc-800" />
                <div>
                  <button 
                    type="button" 
                    onClick={() => alert("Photo upload simulated")} 
                    className="px-3 py-1.5 border border-gray-250 dark:border-zinc-800 text-gray-600 dark:text-zinc-300 text-[11px] font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-805 cursor-pointer"
                  >
                    Change Picture
                  </button>
                  <p className="text-[10px] text-gray-400 mt-1">PNG, JPG formats accepted up to 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="set-name">First & Last Name</label>
                  <input
                    id="set-name"
                    type="text"
                    required
                    value={pName}
                    onChange={(e) => setPName(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="set-email">Email Address</label>
                  <input
                    id="set-email"
                    type="email"
                    required
                    value={pEmail}
                    onChange={(e) => setPEmail(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="set-phone">Phone Number</label>
                  <input
                    id="set-phone"
                    type="tel"
                    required
                    value={pPhone}
                    onChange={(e) => setPPhone(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400" htmlFor="set-currency">Primary Currency</label>
                  <select
                    id="set-currency"
                    value={pCurrency}
                    onChange={(e) => setPCurrency(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 text-gray-900 dark:text-white cursor-pointer"
                  >
                    <option value="USD">USD ($) United States Dollar</option>
                    <option value="EUR">EUR (€) Euro</option>
                    <option value="GBP">GBP (£) Great British Pound</option>
                  </select>
                </div>
              </div>

              {/* Theme inside panel */}
              <div className="border-t border-gray-100 dark:border-zinc-850 pt-5 space-y-2">
                <label className="text-xs font-semibold text-gray-550 dark:text-zinc-400 block">Workspace Palette Style</label>
                <div className="flex gap-2" id="settings-theme-selector">
                  {[
                    { id: 'light', label: 'Light Mode', icon: Sun },
                    { id: 'dark', label: 'Dark Mode', icon: Moon },
                    { id: 'system', label: 'System Align', icon: Laptop }
                  ].map((preset) => {
                    const PresetIcon = preset.icon;
                    const isSel = theme === preset.id;
                    return (
                      <button
                        id={`settings-theme-btn-${preset.id}`}
                        key={preset.id}
                        type="button"
                        onClick={() => setTheme(preset.id as any)}
                        className={`flex-1 max-w-[150px] py-3.5 border rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isSel 
                            ? 'border-indigo-500 bg-indigo-50/10 text-indigo-500 dark:text-indigo-400' 
                            : 'border-gray-200/60 dark:border-zinc-800 text-gray-400 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-zinc-950/50'
                        }`}
                      >
                        <PresetIcon className="h-4.5 w-4.5 shrink-0" />
                        <span className="text-[10px] font-bold">{preset.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-gray-100 dark:border-zinc-850 pt-5">
                <button
                  id="settings-save-profile-btn"
                  type="submit"
                  className="px-5 h-10 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold rounded-xl text-xs hover:bg-zinc-900 dark:hover:bg-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Saved Successfully</span>
                    </>
                  ) : (
                    <span>Save Profile Changes</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: NOTIFICATIONS TOGGLES */}
          {activeTab === 'notifications' && (
            <div className="space-y-6" id="settings-notifications-view">
              <div className="border-b border-gray-100 dark:border-zinc-850 pb-4">
                <h3 className="font-sans font-bold text-base text-gray-950 dark:text-white">Notification Controls</h3>
                <p className="text-xs text-gray-400 mt-1">Determine how and when FinPilot's AI engine notifies you of events.</p>
              </div>

              <div className="space-y-4" id="notifications-toggles-list">
                {[
                  {
                    state: notifBudget,
                    setter: setNotifBudget,
                    title: "Budget Boundary Violations",
                    desc: "Notify me when a category has consumed 80% or 95% of its monthly boundary limit."
                  },
                  {
                    state: notifAi,
                    setter: setNotifAi,
                    title: "FinPilot AI Optimization Tips",
                    desc: "Deliver personalized wealth alerts when the model locates overlapping SaaS subscriptions or cash-flow sweeps."
                  },
                  {
                    state: notifWeekly,
                    setter: setNotifWeekly,
                    title: "Weekly Portfolio Summaries",
                    desc: "Compile an end-of-week ledger PDF report with score trajectory updates."
                  },
                  {
                    state: notifSecurity,
                    setter: setNotifSecurity,
                    title: "Vault Login Alerts",
                    desc: "Trigger high-priority alerts when a login is registered from an unrecognized IP address."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between p-3 rounded-2xl border border-gray-50 dark:border-zinc-850 bg-gray-50/20 dark:bg-zinc-950/10">
                    <div>
                      <p className="text-xs font-bold text-gray-950 dark:text-white">{item.title}</p>
                      <p className="text-[10px] text-gray-450 mt-0.5 leading-normal max-w-md font-sans">{item.desc}</p>
                    </div>
                    <button
                      id={`notif-toggle-${idx}`}
                      type="button"
                      onClick={() => item.setter(!item.state)}
                      className={`h-5 w-9 rounded-full transition-colors relative cursor-pointer ${
                        item.state ? 'bg-indigo-600' : 'bg-gray-250 dark:bg-zinc-850'
                      }`}
                    >
                      <span className={`h-3.5 w-3.5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        item.state ? 'right-0.5' : 'left-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                id="save-notifications-btn"
                onClick={handleSaveProfile}
                className="px-5 h-10 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold rounded-xl text-xs hover:bg-zinc-900 dark:hover:bg-white cursor-pointer mt-4"
              >
                Apply Preferences
              </button>
            </div>
          )}

          {/* TAB 3: CONNECTED ACCOUNTS */}
          {activeTab === 'connected' && (
            <div className="space-y-6" id="settings-connected-view">
              <div className="border-b border-gray-100 dark:border-zinc-850 pb-4">
                <h3 className="font-sans font-bold text-base text-gray-950 dark:text-white">Linked Integrations</h3>
                <p className="text-xs text-gray-400 mt-1">Audit multi-institutional Plaid connections and secure social log-ins.</p>
              </div>

              <div className="space-y-4" id="linked-accounts-list">
                {/* Plaid connection card */}
                <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-200/50 dark:border-zinc-850 bg-gray-50/30 dark:bg-zinc-950/25">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500 flex items-center justify-center font-bold">
                      P
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-950 dark:text-white">Chase Private Client Account</p>
                      <span className="text-[10px] text-emerald-500 font-mono">● LIVE SYNCED OK</span>
                    </div>
                  </div>
                  <button 
                    id="disconnect-plaid"
                    onClick={() => alert("Simulated Plaid disconnect")} 
                    className="px-2.5 py-1 text-gray-500 hover:text-red-500 border border-gray-250 dark:border-zinc-800 text-[10px] font-bold rounded-lg cursor-pointer"
                  >
                    Disconnect
                  </button>
                </div>

                {/* Google Login Connection */}
                <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-200/50 dark:border-zinc-850 bg-gray-50/30 dark:bg-zinc-950/25">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-zinc-800 flex items-center justify-center font-bold">
                      G
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-950 dark:text-white">Google Accounts Sign-In</p>
                      <span className="text-[10px] text-gray-450 truncate">sarah.jenkins@finpilot.ai</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 px-2.5 py-0.5 rounded-full uppercase">PRIMARY SOCIAL</span>
                </div>

                {/* SMS Phone Connection */}
                <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-200/50 dark:border-zinc-850 bg-gray-50/30 dark:bg-zinc-950/25">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-zinc-800 flex items-center justify-center font-bold">
                      #
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-950 dark:text-white">SMS Phone Number MFA</p>
                      <span className="text-[10px] text-gray-450">{userProfile.phone}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-0.5 rounded-full uppercase">VERIFIED</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRIVACY & DANGER ZONE */}
          {activeTab === 'danger' && (
            <div className="space-y-6" id="settings-danger-view">
              <div className="border-b border-gray-100 dark:border-zinc-850 pb-4">
                <h3 className="font-sans font-bold text-base text-gray-950 dark:text-white">Privacy & Danger Zone</h3>
                <p className="text-xs text-gray-400 mt-1">Export your data logs or purge your cryptographic wallet from Cloud Run containers.</p>
              </div>

              <div className="space-y-4" id="danger-zone-operations">
                {/* Export Card */}
                <div className="p-5 rounded-2xl border border-gray-200/50 dark:border-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white font-sans">Compile Ledger Export</h4>
                    <p className="text-[10px] text-gray-450 mt-1 max-w-md leading-normal font-sans">Request an offline download of your transaction history, budget allocations, and co-pilot chat transcripts in JSON standard.</p>
                  </div>
                  <button
                    id="export-data-action"
                    onClick={handleExportDataSimulation}
                    className="px-3.5 py-2 border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 text-xs font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-850 cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export Ledger</span>
                  </button>
                </div>

                {/* Delete Purge Card */}
                <div className="p-5 rounded-2xl border border-red-200 dark:border-red-950/20 bg-red-50/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-red-500 font-sans">Purge Personal Vault</h4>
                    <p className="text-[10px] text-gray-450 mt-1 max-w-md leading-normal font-sans">Permanently dissolve your database credentials, Plaid sync pools, and active accounts. This is non-recoverable.</p>
                  </div>
                  <button
                    id="purge-account-action"
                    onClick={handleDeleteAccountSimulation}
                    className="px-3.5 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
