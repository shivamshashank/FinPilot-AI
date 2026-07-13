export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  description: string;
  paymentMethod: string;
  receiptUrl?: string;
  status: 'completed' | 'pending';
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  color: string;
  period: 'monthly' | 'yearly';
}

export interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  color: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isReceiptAnalysis?: boolean;
}

export interface FinancialAlert {
  id: string;
  title: string;
  description: string;
  type: 'alert' | 'warning' | 'info' | 'success';
  timestamp: string;
  read: boolean;
  category: 'budget' | 'security' | 'ai' | 'payment';
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  financialScore: number;
  currency: string;
  connectedGoogle: boolean;
  connectedPhone: boolean;
  notificationPreferences: {
    budgetAlerts: boolean;
    aiInsights: boolean;
    weeklyReports: boolean;
    securityAlerts: boolean;
  };
}
