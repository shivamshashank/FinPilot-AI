import { Transaction, Budget, SavingsGoal, FinancialAlert, UserProfile } from './types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: "Sarah Jenkins",
  email: "sarah.jenkins@finpilot.ai",
  phone: "+1 (555) 382-9102",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
  financialScore: 82, // Out of 100
  currency: "USD",
  connectedGoogle: true,
  connectedPhone: true,
  notificationPreferences: {
    budgetAlerts: true,
    aiInsights: true,
    weeklyReports: false,
    securityAlerts: true
  }
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  // Income
  {
    id: "tx-1",
    type: "income",
    category: "Salary",
    amount: 6450.00,
    date: "2026-07-01",
    description: "Fintech Corp Monthly Salary",
    paymentMethod: "Direct Deposit",
    status: "completed"
  },
  {
    id: "tx-2",
    type: "income",
    category: "Freelance",
    amount: 1250.00,
    date: "2026-07-08",
    description: "UI Redesign Contract - Acme Co",
    paymentMethod: "Stripe",
    status: "completed"
  },
  {
    id: "tx-3",
    type: "income",
    category: "Investment",
    amount: 430.00,
    date: "2026-07-10",
    description: "S&P 500 Quarterly Dividends",
    paymentMethod: "Brokerage Transfer",
    status: "completed"
  },
  {
    id: "tx-4",
    type: "income",
    category: "Business",
    amount: 890.00,
    date: "2026-07-12",
    description: "Shopify Store Weekly Payout",
    paymentMethod: "PayPal",
    status: "completed"
  },

  // Expenses
  {
    id: "tx-5",
    type: "expense",
    category: "Housing",
    amount: 1950.00,
    date: "2026-07-02",
    description: "Monthly Rent Payment",
    paymentMethod: "ACH Auto-Pay",
    status: "completed"
  },
  {
    id: "tx-6",
    type: "expense",
    category: "Groceries",
    amount: 245.50,
    date: "2026-07-03",
    description: "Whole Foods Market Delivery",
    paymentMethod: "Apple Pay (Chase Visa)",
    status: "completed",
    receiptUrl: "#"
  },
  {
    id: "tx-7",
    type: "expense",
    category: "Dining Out",
    amount: 128.00,
    date: "2026-07-05",
    description: "Atera Restaurant Sushi Dinner",
    paymentMethod: "Chase Sapphire",
    status: "completed"
  },
  {
    id: "tx-8",
    type: "expense",
    category: "Transport",
    amount: 42.50,
    date: "2026-07-06",
    description: "Uber Ride to JFK Airport",
    paymentMethod: "Apple Pay (Chase Visa)",
    status: "completed"
  },
  {
    id: "tx-9",
    type: "expense",
    category: "Entertainment",
    amount: 79.99,
    date: "2026-07-07",
    description: "Concert Tickets - Madison Square",
    paymentMethod: "Visa Premium",
    status: "completed"
  },
  {
    id: "tx-10",
    type: "expense",
    category: "Shopping",
    amount: 189.00,
    date: "2026-07-08",
    description: "Nike Air Max Sneakers",
    paymentMethod: "Chase Sapphire",
    status: "completed"
  },
  {
    id: "tx-11",
    type: "expense",
    category: "Utilities",
    amount: 115.40,
    date: "2026-07-09",
    description: "ConEd Power & Water",
    paymentMethod: "Bank Debit Card",
    status: "completed"
  },
  {
    id: "tx-12",
    type: "expense",
    category: "Software SaaS",
    amount: 29.00,
    date: "2026-07-10",
    description: "Linear App Premium Plan",
    paymentMethod: "Stripe Card",
    status: "completed"
  },
  {
    id: "tx-13",
    type: "expense",
    category: "Software SaaS",
    amount: 19.99,
    date: "2026-07-11",
    description: "ChatGPT Plus Subscription",
    paymentMethod: "Stripe Card",
    status: "completed"
  },
  {
    id: "tx-14",
    type: "expense",
    category: "Groceries",
    amount: 88.20,
    date: "2026-07-12",
    description: "Trader Joe's Weekly Run",
    paymentMethod: "Apple Pay (Chase Visa)",
    status: "completed",
    receiptUrl: "#"
  },
  {
    id: "tx-15",
    type: "expense",
    category: "Health & Fitness",
    amount: 160.00,
    date: "2026-07-13",
    description: "Equinox Gym Monthly Fee",
    paymentMethod: "Visa Premium",
    status: "pending"
  },
  {
    id: "tx-16",
    type: "expense",
    category: "Dining Out",
    amount: 24.50,
    date: "2026-07-13",
    description: "Blue Bottle Coffee & Pastry",
    paymentMethod: "Apple Pay (Chase Visa)",
    status: "completed"
  }
];

export const INITIAL_BUDGETS: Budget[] = [
  {
    id: "b-1",
    category: "Housing",
    limit: 2000,
    spent: 1950,
    color: "#6366f1", // Indigo
    period: "monthly"
  },
  {
    id: "b-2",
    category: "Groceries",
    limit: 500,
    spent: 333.70,
    color: "#10b981", // Emerald
    period: "monthly"
  },
  {
    id: "b-3",
    category: "Dining Out",
    limit: 400,
    spent: 152.50,
    color: "#f59e0b", // Amber
    period: "monthly"
  },
  {
    id: "b-4",
    category: "Transport",
    limit: 200,
    spent: 42.50,
    color: "#3b82f6", // Blue
    period: "monthly"
  },
  {
    id: "b-5",
    category: "Entertainment",
    limit: 300,
    spent: 79.99,
    color: "#ec4899", // Pink
    period: "monthly"
  },
  {
    id: "b-6",
    category: "Shopping",
    limit: 400,
    spent: 189.00,
    color: "#8b5cf6", // Purple
    period: "monthly"
  },
  {
    id: "b-7",
    category: "Software SaaS",
    limit: 100,
    spent: 48.99,
    color: "#06b6d4", // Cyan
    period: "monthly"
  }
];

export const INITIAL_SAVINGS_GOALS: SavingsGoal[] = [
  {
    id: "sg-1",
    name: "Emergency Fund",
    target: 20000,
    current: 15000,
    deadline: "2026-12-31",
    color: "#10b981",
    category: "Safety"
  },
  {
    id: "sg-2",
    name: "Tokyo Trip 2027",
    target: 6000,
    current: 3200,
    deadline: "2027-04-15",
    color: "#f43f5e",
    category: "Travel"
  },
  {
    id: "sg-3",
    name: "Tesla Downpayment",
    target: 15000,
    current: 4500,
    deadline: "2026-10-01",
    color: "#3b82f6",
    category: "Vehicle"
  }
];

export const INITIAL_ALERTS: FinancialAlert[] = [
  {
    id: "al-1",
    title: "Housing Rent Paid",
    description: "Your monthly recurring rent of $1,950.00 was auto-debited and processed successfully.",
    type: "success",
    timestamp: "2026-07-02T10:00:00Z",
    read: true,
    category: "payment"
  },
  {
    id: "al-2",
    title: "Approach 80% of Housing Budget",
    description: "You have spent $1,950.00 of your $2,000.00 Housing budget for July.",
    type: "warning",
    timestamp: "2026-07-02T10:15:00Z",
    read: false,
    category: "budget"
  },
  {
    id: "al-3",
    title: "AI Optimization Recommendation",
    description: "FinPilot AI identified $45.00/month of redundant SaaS subscriptions. View suggestions.",
    type: "info",
    timestamp: "2026-07-10T09:30:00Z",
    read: false,
    category: "ai"
  },
  {
    id: "al-4",
    title: "New Login Detected",
    description: "A login was registered from Chrome on macOS (IP: 198.51.100.42) near New York, USA.",
    type: "alert",
    timestamp: "2026-07-13T07:12:00Z",
    read: false,
    category: "security"
  },
  {
    id: "al-5",
    title: "Investment Dividend Received",
    description: "S&P 500 Quarterly Dividend payout of $430.00 was credited to your brokerage pool.",
    type: "success",
    timestamp: "2026-07-10T14:00:00Z",
    read: true,
    category: "payment"
  }
];

export const FAQ_ITEMS = [
  {
    question: "How does FinPilot AI categorize my expenses?",
    answer: "FinPilot AI uses secure integrations to read bank statements and receipts, applying an advanced ML model to automatically sort transactions into highly accurate categories such as Housing, Groceries, Dining Out, Utilities, and Software."
  },
  {
    question: "Is my financial data secure with FinPilot AI?",
    answer: "Absolutely. We utilize bank-grade AES-256 encryption, MFA (Multi-Factor Authentication), and read-only connections via trusted data providers like Plaid. We never sell or share your personal data."
  },
  {
    question: "Can I connect multiple bank accounts or credit cards?",
    answer: "Yes, you can link as many checking accounts, high-yield savings accounts, and credit cards from major institutions as you need to aggregate your complete net worth dashboard."
  },
  {
    question: "What is the Financial Score and how is it calculated?",
    answer: "The Financial Score is a real-time health indicator ranging from 0-100. It measures your overall financial stability by analyzing your savings rate, budget compliance, emergency fund reserves, and debt ratios."
  }
];

export const MOCK_CHART_MONTHLY = [
  { month: "Jan", Income: 5800, Expense: 4200, Savings: 1600 },
  { month: "Feb", Income: 6100, Expense: 4400, Savings: 1700 },
  { month: "Mar", Income: 5900, Expense: 4100, Savings: 1800 },
  { month: "Apr", Income: 6800, Expense: 4800, Savings: 2000 },
  { month: "May", Income: 7200, Expense: 4600, Savings: 2600 },
  { month: "Jun", Income: 8100, Expense: 5100, Savings: 3000 },
  { month: "Jul", Income: 9020, Expense: 3163, Savings: 5857 } // current month sum
];

export const MOCK_CHART_CATEGORIES = [
  { name: "Housing", value: 1950, color: "#6366f1" },
  { name: "Groceries", value: 333.7, color: "#10b981" },
  { name: "Dining Out", value: 152.5, color: "#f59e0b" },
  { name: "Transport", value: 42.5, color: "#3b82f6" },
  { name: "Entertainment", value: 79.99, color: "#ec4899" },
  { name: "Shopping", value: 189.00, color: "#8b5cf6" },
  { name: "Software SaaS", value: 48.99, color: "#06b6d4" }
];

export const MOCK_CHART_CASHFLOW = [
  { date: "Jul 01", NetWorth: 42800, Cash: 8500 },
  { date: "Jul 03", NetWorth: 43400, Cash: 8250 },
  { date: "Jul 05", NetWorth: 43250, Cash: 8122 },
  { date: "Jul 07", NetWorth: 43500, Cash: 8042 },
  { date: "Jul 09", NetWorth: 44800, Cash: 9176 },
  { date: "Jul 11", NetWorth: 45400, Cash: 9586 },
  { date: "Jul 13", NetWorth: 46250, Cash: 10312 }
];

export const MOCK_HEATMAP = [
  { day: "Mon", week1: 42, week2: 128, week3: 24, week4: 15 },
  { day: "Tue", week1: 1950, week2: 0, week3: 0, week4: 8 },
  { day: "Wed", week1: 245, week2: 0, week3: 0, week4: 40 },
  { day: "Thu", week1: 0, week2: 0, week3: 115, week4: 0 },
  { day: "Fri", week1: 128, week2: 79, week3: 29, week4: 90 },
  { day: "Sat", week1: 0, week2: 189, week3: 19, week4: 12 },
  { day: "Sun", week1: 42, week2: 0, week3: 88, week4: 34 }
];

export const CHAT_SUGGESTED_PROMPTS = [
  "How can I save $500 more this month?",
  "Review my SaaS subscription expenses",
  "Is my current rent within healthy budget ratios?",
  "Analyze this receipt: Grocery items for $88.20",
  "Give me budget optimization suggestions"
];

export const CHAT_RESPONSES: { [key: string]: string } = {
  "how can i save $500 more this month?": `To save an additional **$500.00** this month, we need to locate potential savings within your active discretionary spending categories.

Here is an actionable optimization plan based on your current July spending patterns:

1. **Dining Out (Opportunity: -$150)**:
   - You've already spent **$152.50** of your **$400** Dining Out budget. At your current pace, you will reach $350.
   - *Recommendation*: Restrict dining out to twice a week. Prepare meals at home. This can easily shave off $150.00.

2. **Shopping & Clothing (Opportunity: -$120)**:
   - You recently spent **$189.00** on *Nike Air Max Sneakers*, which accounts for almost half of your monthly Shopping allowance ($400).
   - *Recommendation*: Delay non-essential electronic or wardrobe upgrades until next month. Save $120.00.

3. **Software & Subscriptions (Opportunity: -$45)**:
   - You are running multiple SaaS subscriptions like ChatGPT Plus, gym fees, and software, currently summing to around **$228.99**.
   - *Recommendation*: We found some redundant dev tool subscriptions. Pausing them recovers **$45.00** monthly.

4. **Groceries Optimization (Opportunity: -$60)**:
   - Your grocery trips (Whole Foods and Trader Joe's) sum to **$333.70** out of a **$500** limit.
   - *Recommendation*: Swap to store-brands and utilize bulk-purchases for pantry staples.

5. **Direct Savings Transfer (Action: +$125)**:
   - Transfer an immediate lump-sum of **$125.00** from your checking to your *Emergency Fund* savings goal today. This locks away the money before you can spend it.

**Estimated Savings Realized: $500.00** 💸`,

  "review my saas subscription expenses": `Let's analyze your monthly recurring subscriptions and software expenses.

Currently, you have the following active SaaS and utility subscriptions logged:
- **Equinox Gym Monthly Fee**: $160.00 / month
- **Linear App Premium Plan**: $29.00 / month
- **ChatGPT Plus Subscription**: $19.99 / month
- **Utilities / ConEd Power & Water**: $115.40 / month (Variable)

### 📊 Subscription Analysis & Insights:
1. **Gym Membership ($160.00/mo)**: This is high, but if you visit at least 12 times a month, your cost-per-visit is **$13.33**, which is highly cost-effective compared to boutique single-session classes ($35+). If you're going less than 4 times, consider downgrading or switching to a standard gym to save **$100.00/month**.
2. **Linear App Premium ($29.00/mo)**: Since you have $1,250.00 in Freelance income from Acme Co, this is a legitimate business deduction. Keep this, but ensure you classify it under freelance operational expenses for tax season.
3. **ChatGPT Plus ($19.99/mo)**: High utilization for code generation and copy editing. Essential for your productivity output. Keep active.

### 💡 FinPilot Smart Suggestions:
- **Consolidation**: Do you have any duplicate streaming services (e.g., Netflix, Spotify, Disney+) not actively reflected here? Aggregating and sharing family plans can save up to **$35.00/month**.
- **Set Alerts**: I have set a budget alert on your "Software SaaS" budget category to trigger if any un-noted subscription auto-renews.`,

  "is my current rent within healthy budget ratios?": `Your monthly rent is **$1,950.00**.

Let's evaluate how this fits against your income ratios using standard financial frameworks:

### 1. The 30% Rule of Thumb
Historically, it's recommended that housing costs shouldn't exceed 30% of your gross monthly income.
* Your current Monthly Salary: **$6,450.00** (Net)
* Total Monthly Income (including Freelance & Shopify payouts this month): **$9,020.00**
* **Rent-to-Salary Ratio (Gross/Net Base)**: **30.2%**
* **Rent-to-Total Income Ratio**: **21.6%**

*Verdict*: On your base salary alone, your rent sits **exactly at the 30% boundary**. When including your supplementary freelance and business streams, it drops to a highly comfortable **21.6%**.

### 2. The 50/30/20 Rule
Under this rule, 50% of your net income goes to Needs (Rent, Utilities, Groceries), 30% to Wants (Dining, Entertainment, Shopping), and 20% to Savings/Debt.
* **Your Needs this month**: Rent ($1,950) + Groceries ($333.70) + Utilities ($115.40) = **$2,399.10**
* Percentage of Base Income ($6,450): **37.2%**
* Percentage of Total Income ($9,020): **26.6%**

### 🌟 Financial Recommendation:
You are in a **very strong position**. Your housing costs are fully sustainable. However, because freelance and business income can fluctuate, make sure your fixed *Needs* (housing, utilities) do not exceed 50% of your guaranteed **base salary** ($3,225). Right now, you are at **37.2%**, giving you a comfortable safety cushion of **$825.90** every month.`,

  "analyze this receipt: grocery items for $88.20": `🧾 **FinPilot AI Receipt Analysis**
**Merchant**: Trader Joe's #542 (Chelsea, NY)
**Date**: July 12, 2026
**Total Amount**: $88.20
**Status**: MATCHED & CATEGORIZED (Groceries)

### 🔍 Breakdown of Purchases:
* **Organic Produce (Spinach, Avocados, Berries)**: $24.50 *(Excellent value, healthy category)*
* **Grass-Fed Ground Beef & Chicken Breast**: $32.80 *(High protein base, meal-prep efficient)*
* **Sourdough Bread, Almond Milk, Eggs**: $14.10 *(Pantry staples)*
* **Discretionary Snacks (Dark Chocolate, Peanut Butter Cups)**: $16.80 *(19% of total purchase)*

### 💡 Smart Insights:
1. **Budget Status**: This expense has been successfully matched to Transaction **tx-14** and debited against your **Groceries** budget category. You now have **$166.30** remaining of your $500.00 grocery allocation for July (66% spent, 42% of the month remains - you are on track!).
2. **Savings tip**: Discretionary snacks and desserts represented nearly **19%** of this bill. If you're looking to shave grocery expenses down, focusing on raw, whole ingredients instead of brand-name snacks is your best leverage.`,

  "give me budget optimization suggestions": `Here are 3 tailor-made budget optimizations for you, based on your active spending patterns and cash flow:

### 1. Recalibrate Your "Dining Out" Limit 🍔
* **Current Limit**: $400.00 | **Spent (to-date)**: $152.50
* **Analysis**: You are currently spending an average of $11.73 per day on Dining Out. Projecting this to the end of July puts you at roughly $360.00.
* **Action**: Lower your official budget limit to **$300.00** next month. This creates a psychological constraint and frees up **$100.00** to be automatically redirected to your *Emergency Fund* savings goal.

### 2. Capitalize on Freelance Surplus 💻
* **Surplus**: You earned an extra **$1,250.00** from Acme Co this week.
* **Problem**: When we receive freelance payouts, we are highly susceptible to "lifestyle creep"—subconsciously increasing discretionary spending.
* **Action**: Implement a **"70/30 Surplus Rule"**. Immediately route 70% ($875.00) directly into high-yield savings goals or index funds, and use only 30% ($375.00) as a reward/fun-money pool.

### 3. Establish a Utility Cushion ⚡
* **Symptom**: Summer utilities (ConEd electricity) are rising due to A/C usage ($115.40 this month).
* **Action**: Set up a **"Sinking Fund"** with an extra $30/month during the winter to offset the higher electric bills in the summer. This keeps your monthly cash flow perfectly flat and predictable.`
};
