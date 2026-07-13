import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, Budget, SavingsGoal, FinancialAlert, UserProfile, ChatMessage } from '../types';
import { 
  INITIAL_USER_PROFILE, 
  INITIAL_TRANSACTIONS, 
  INITIAL_BUDGETS, 
  INITIAL_SAVINGS_GOALS, 
  INITIAL_ALERTS,
  CHAT_RESPONSES
} from '../mockData';

export type AuthStep = 'landing' | 'signin' | 'otp' | 'success' | 'authenticated';

interface AppContextType {
  // Auth State
  isAuthenticated: boolean;
  authStep: AuthStep;
  setAuthStep: (step: AuthStep) => void;
  userProfile: UserProfile;
  loginWithGoogle: () => Promise<void>;
  loginWithPhone: (phoneNumber: string) => Promise<void>;
  verifyOTP: (code: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;

  // Financial Data State
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  editTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  
  budgets: Budget[];
  addBudget: (budget: Omit<Budget, 'id' | 'spent'>) => void;
  editBudget: (budget: Budget) => void;
  deleteBudget: (id: string) => void;

  savingsGoals: SavingsGoal[];
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id' | 'current'>) => void;
  editSavingsGoal: (goal: SavingsGoal) => void;
  deleteSavingsGoal: (id: string) => void;
  contributeToGoal: (id: string, amount: number) => void;

  // Alerts/Notifications
  alerts: FinancialAlert[];
  markAlertAsRead: (id: string) => void;
  markAllAlertsAsRead: () => void;
  deleteAlert: (id: string) => void;
  addAlert: (alert: Omit<FinancialAlert, 'id' | 'timestamp' | 'read'>) => void;

  // AI Chat
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string, isReceipt?: boolean) => void;
  clearChat: () => void;
  isAiTyping: boolean;

  // Navigation / Current View (Simulated Router)
  currentView: string;
  setCurrentView: (view: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Navigation State (Simple state-based router for seamless animated views)
  const [currentView, setCurrentView] = useState<string>(() => {
    return localStorage.getItem('finpilot_view') || 'dashboard';
  });

  useEffect(() => {
    localStorage.setItem('finpilot_view', currentView);
  }, [currentView]);

  // Auth States
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('finpilot_auth_state') === 'true';
  });
  const [authStep, setAuthStepState] = useState<AuthStep>(() => {
    const authed = localStorage.getItem('finpilot_auth_state') === 'true';
    return authed ? 'authenticated' : 'landing';
  });

  const setAuthStep = (step: AuthStep) => {
    setAuthStepState(step);
    if (step === 'authenticated') {
      setIsAuthenticated(true);
      localStorage.setItem('finpilot_auth_state', 'true');
    } else if (step === 'landing') {
      setIsAuthenticated(false);
      localStorage.removeItem('finpilot_auth_state');
    }
  };

  const [phoneForOTP, setPhoneForOTP] = useState<string>('');

  // Core Financial Database States (Persisted in localStorage)
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('finpilot_user_profile');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('finpilot_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const saved = localStorage.getItem('finpilot_budgets');
    return saved ? JSON.parse(saved) : INITIAL_BUDGETS;
  });

  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(() => {
    const saved = localStorage.getItem('finpilot_savings_goals');
    return saved ? JSON.parse(saved) : INITIAL_SAVINGS_GOALS;
  });

  const [alerts, setAlerts] = useState<FinancialAlert[]>(() => {
    const saved = localStorage.getItem('finpilot_alerts');
    return saved ? JSON.parse(saved) : INITIAL_ALERTS;
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('finpilot_chat');
    return saved ? JSON.parse(saved) : [
      {
        id: "m-1",
        sender: "assistant",
        text: "Hello! I'm **FinPilot**, your AI co-pilot for personal finance. Ask me to analyze your budgets, check subscriptions, review transactions, or suggest savings optimization plans!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [isAiTyping, setIsAiTyping] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('finpilot_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('finpilot_transactions', JSON.stringify(transactions));
    // Re-calculate budget spent amounts on transaction updates
    const updatedBudgets = budgets.map(b => {
      const spent = transactions
        .filter(t => t.type === 'expense' && t.category === b.category && t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0);
      return { ...b, spent: parseFloat(spent.toFixed(2)) };
    });
    localStorage.setItem('finpilot_budgets', JSON.stringify(updatedBudgets));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finpilot_savings_goals', JSON.stringify(savingsGoals));
  }, [savingsGoals]);

  useEffect(() => {
    localStorage.setItem('finpilot_alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('finpilot_chat', JSON.stringify(chatMessages));
  }, [chatMessages]);


  // Auth API Methods
  const loginWithGoogle = async () => {
    setAuthStep('success');
  };

  const loginWithPhone = async (phoneNumber: string) => {
    setPhoneForOTP(phoneNumber);
    setAuthStep('otp');
  };

  const verifyOTP = async (code: string) => {
    // Check if OTP code is 6 digits (for simulation, any 6 digit works)
    if (code.length === 6) {
      setUserProfile(prev => ({
        ...prev,
        phone: phoneForOTP || prev.phone,
        connectedPhone: true
      }));
      setAuthStep('success');
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthStep('landing');
    setCurrentView('dashboard');
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
  };


  // Expense & Income DB Methods
  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: `tx-${Date.now()}`
    };
    setTransactions(prev => [newTx, ...prev]);

    // Update profile score dynamically for engagement
    setUserProfile(prev => ({
      ...prev,
      financialScore: Math.min(100, Math.max(0, prev.financialScore + (tx.type === 'income' ? 1 : -0.5)))
    }));

    // Post alert for budget checks if expense
    if (tx.type === 'expense') {
      const budget = budgets.find(b => b.category === tx.category);
      if (budget) {
        const potentialSpent = budget.spent + tx.amount;
        if (potentialSpent >= budget.limit * 0.9) {
          addAlert({
            title: `Budget Limit Alert: ${tx.category}`,
            description: `Your spending on ${tx.category} has reached $${potentialSpent.toFixed(2)} of your $${budget.limit} limit.`,
            type: 'warning',
            category: 'budget'
          });
        }
      }
    }
  };

  const editTransaction = (updatedTx: Transaction) => {
    setTransactions(prev => prev.map(t => t.id === updatedTx.id ? updatedTx : t));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };


  // Budget DB Methods
  const addBudget = (budget: Omit<Budget, 'id' | 'spent'>) => {
    const newBudget: Budget = {
      ...budget,
      id: `b-${Date.now()}`,
      spent: 0
    };
    setBudgets(prev => [...prev, newBudget]);
  };

  const editBudget = (updatedBudget: Budget) => {
    setBudgets(prev => prev.map(b => b.id === updatedBudget.id ? updatedBudget : b));
  };

  const deleteBudget = (id: string) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
  };


  // Savings Goals DB Methods
  const addSavingsGoal = (goal: Omit<SavingsGoal, 'id' | 'current'>) => {
    const newGoal: SavingsGoal = {
      ...goal,
      id: `sg-${Date.now()}`,
      current: 0
    };
    setSavingsGoals(prev => [...prev, newGoal]);
  };

  const editSavingsGoal = (updatedGoal: SavingsGoal) => {
    setSavingsGoals(prev => prev.map(g => g.id === updatedGoal.id ? updatedGoal : g));
  };

  const deleteSavingsGoal = (id: string) => {
    setSavingsGoals(prev => prev.filter(g => g.id !== id));
  };

  const contributeToGoal = (id: string, amount: number) => {
    setSavingsGoals(prev => prev.map(g => {
      if (g.id === id) {
        const nextAmount = Math.min(g.target, g.current + amount);
        
        // Log transaction for the contribution
        addTransaction({
          type: 'expense',
          category: 'Shopping', // count savings contribution under shopping or other
          amount: amount,
          date: new Date().toISOString().split('T')[0],
          description: `Contribution to Savings Goal: ${g.name}`,
          paymentMethod: 'Internal Transfer',
          status: 'completed'
        });

        // Trigger safety success alert if goal completed
        if (nextAmount >= g.target && g.current < g.target) {
          addAlert({
            title: `Goal Achieved: ${g.name}!`,
            description: `Incredible milestone! You have fully funded your '${g.name}' savings target of $${g.target.toLocaleString()}.`,
            type: 'success',
            category: 'payment'
          });
        }

        return { ...g, current: nextAmount };
      }
      return g;
    }));
  };


  // Alert / Notifications Methods
  const markAlertAsRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const markAllAlertsAsRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const addAlert = (alert: Omit<FinancialAlert, 'id' | 'timestamp' | 'read'>) => {
    const newAlert: FinancialAlert = {
      ...alert,
      id: `al-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false
    };
    setAlerts(prev => [newAlert, ...prev]);
  };


  // AI Chat Interface
  const sendChatMessage = (text: string, isReceipt = false) => {
    const userMsg: ChatMessage = {
      id: `m-usr-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isReceiptAnalysis: isReceipt
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsAiTyping(true);

    // Simulate conversational intelligence based on inputs
    setTimeout(() => {
      const query = text.toLowerCase().trim();
      let reply = "";

      if (isReceipt) {
        reply = CHAT_RESPONSES["analyze this receipt: grocery items for $88.20"];
      } else {
        // Try exact keys, then partial matching
        if (CHAT_RESPONSES[query]) {
          reply = CHAT_RESPONSES[query];
        } else if (query.includes("save") || query.includes("budget") && query.includes("500") || query.includes("more")) {
          reply = CHAT_RESPONSES["how can i save $500 more this month?"];
        } else if (query.includes("subscription") || query.includes("saas") || query.includes("gym")) {
          reply = CHAT_RESPONSES["review my saas subscription expenses"];
        } else if (query.includes("rent") || query.includes("ratio") || query.includes("housing")) {
          reply = CHAT_RESPONSES["is my current rent within healthy budget ratios?"];
        } else if (query.includes("suggest") || query.includes("optimize") || query.includes("tip")) {
          reply = CHAT_RESPONSES["give me budget optimization suggestions"];
        } else {
          // General context-aware AI response based on real client stats
          const totalSpent = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
          const totalEarned = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
          const activeSavings = savingsGoals.reduce((sum, g) => sum + g.current, 0);
          
          reply = `I've analyzed your current account state:
- Total July Earned: **$${totalEarned.toLocaleString(undefined, { minimumFractionDigits: 2 })}**
- Total July Spent: **$${totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}**
- Savings Goal Progress: **$${activeSavings.toLocaleString()}** accrued across your targets.
- Financial Score: **${userProfile.financialScore}/100** *(Healthy - Keep it up!)*

What would you like me to focus on? You can ask me to:
- "Review my SaaS subscription expenses"
- "Give me budget optimization suggestions"
- "Is my rent within safe margins?"
- Or upload an invoice/receipt above for immediate line-item extraction!`;
        }
      }

      const aiMsg: ChatMessage = {
        id: `m-ai-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, aiMsg]);
      setIsAiTyping(false);

      // Trigger notification for the advice
      addAlert({
        title: "AI Chat Assistant Update",
        description: "New personalized financial insight generated by FinPilot.",
        type: 'info',
        category: 'ai'
      });
    }, 1500);
  };

  const clearChat = () => {
    setChatMessages([
      {
        id: "m-1",
        sender: "assistant",
        text: "Hello! Chat session reset. Ask me anything about your finances!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      authStep,
      setAuthStep,
      userProfile,
      loginWithGoogle,
      loginWithPhone,
      verifyOTP,
      logout,
      updateProfile,

      transactions,
      addTransaction,
      editTransaction,
      deleteTransaction,

      budgets,
      addBudget,
      editBudget,
      deleteBudget,

      savingsGoals,
      addSavingsGoal,
      editSavingsGoal,
      deleteSavingsGoal,
      contributeToGoal,

      alerts,
      markAlertAsRead,
      markAllAlertsAsRead,
      deleteAlert,
      addAlert,

      chatMessages,
      sendChatMessage,
      clearChat,
      isAiTyping,

      currentView,
      setCurrentView
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
