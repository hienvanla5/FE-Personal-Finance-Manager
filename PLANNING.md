# Personal Finance Manager — Project Planning

## Overview
A personal finance management web app built with Next.js 14 App Router.
No backend — all data is TypeScript mock data.
UI uses pastel neutral tones, responsive for desktop and mobile.

---

## Pages (App Router)

| Route | File | Description |
|-------|------|-------------|
| `/` | app/page.tsx | Redirect → /dashboard |
| `/dashboard` | app/dashboard/page.tsx | Financial overview |
| `/transactions` | app/transactions/page.tsx | Transaction list & filter |
| `/wallets` | app/wallets/page.tsx | Wallet management |
| `/categories` | app/categories/page.tsx | Category management |
| `/budgets` | app/budgets/page.tsx | Budget management |
| `/profile` | app/profile/page.tsx | User profile |

---

## TypeScript Types

```ts
// src/types/index.ts

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  currency: 'USD' | 'EUR' | 'VND'
  locale: 'en-US' | 'vi-VN'
  createdAt: string
}

export interface Wallet {
  id: string
  name: string
  type: 'cash' | 'bank' | 'card' | 'crypto' | 'saving'
  balance: number
  currency: string
  color: string    // pastel hex
  icon: string     // lucide icon name
  isDefault: boolean
}

export type TransactionType = 'income' | 'expense' | 'transfer'

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  date: string          // ISO string
  categoryId: string
  walletId: string
  toWalletId?: string   // only for transfer type
  note: string
  createdAt: string
}

export interface Category {
  id: string
  name: string
  icon: string          // lucide icon name
  color: string         // pastel hex
  type: 'income' | 'expense'
  parentId?: string     // supports sub-categories
}

export interface Budget {
  id: string
  categoryId: string
  limit: number
  period: 'monthly' | 'weekly'
  startDate: string
  currency: string
}
```

---

## Mock Data Plan

### data/mock-user.ts
One user acting as the currently logged-in user.

### data/mock-wallets.ts
5 wallets: Cash, Chase Bank, Savings, Visa Card, Crypto.
Each has a realistic balance and a distinct pastel color. Total ~$24,000.

### data/mock-categories.ts
~20 categories covering both income and expense:
- Income: Salary, Freelance, Investments, Bonus, Other
- Expense: Food & Dining, Transport, Shopping, Entertainment, Healthcare, Education, Rent, Utilities, Subscriptions, Other

### data/mock-transactions.ts
30 transactions spread across the last 3 months, mix of types and categories, realistic USD amounts.

### data/mock-budgets.ts
6 budgets for common expense categories. 2 of them above 80% spent so the UI looks interesting.

---

## Components by Module

### UI Atoms (components/ui/)
- Button — variant: primary, secondary, ghost, danger
- Card — wrapper with pastel border + shadow
- Badge — colored chip by category/type
- Input, Select, Textarea — styled form fields
- Modal — overlay dialog
- Skeleton — loading placeholder

### Layout (components/layout/)
- Sidebar — desktop nav (fixed left)
- BottomNav — mobile nav (fixed bottom)
- Header — page title + user avatar
- PageShell — wraps Sidebar + content area

### Dashboard (components/dashboard/)
- SummaryCards — 4 cards: Net Worth, Monthly Income, Monthly Expenses, Savings
- IncomeExpenseChart — Recharts bar chart
- SpendingPieChart — Recharts pie chart by category
- RecentTransactions — last 5 transactions
- BudgetOverview — progress bars for active budgets

### Wallet (components/wallet/)
- WalletCard — single wallet (name, balance, icon, color)
- WalletList — grid of WalletCards
- WalletForm — add/edit form inside Modal
- TotalBalance — sum of all wallets

### Transaction (components/transaction/)
- TransactionItem — single row (icon, category, amount, date)
- TransactionList — grouped by date
- TransactionForm — add/edit form
- TransactionFilter — filter bar (type, category, wallet, date range)

### Category (components/category/)
- CategoryBadge — small chip with icon + name
- CategoryList — grid with edit/delete
- CategoryForm — add/edit form

### Budget (components/budget/)
- BudgetCard — name, limit, spent, progress bar
- BudgetList — list of budget cards
- BudgetForm — add/edit form

### Profile (components/profile/)
- ProfileCard — avatar, name, email, currency
- ProfileForm — edit profile form
- StatsOverview — total transactions, income, expenses

---

## Zustand Stores

### store/useTransactionStore.ts
- state: transactions, filters
- actions: addTransaction, updateTransaction, deleteTransaction, setFilters

### store/useWalletStore.ts
- state: wallets
- actions: addWallet, updateWallet, deleteWallet

### store/useBudgetStore.ts
- state: budgets
- actions: addBudget, updateBudget, deleteBudget
- computed: getBudgetSpent(budgetId) → sum from transactions

### store/useCategoryStore.ts
- state: categories
- actions: addCategory, updateCategory, deleteCategory

---

## Lib Utilities

### lib/formatters.ts
- formatCurrency(amount, currency) → "$1,500.00" or "1.500.000 ₫"
- formatDate(isoString) → "January 15, 2025"
- formatRelativeDate(isoString) → "Today", "Yesterday", "3 days ago"

### lib/constants.ts
- PASTEL_COLORS: string[] — array of pastel hex values for pickers
- WALLET_ICONS: string[] — lucide icon names for wallets
- CATEGORY_ICONS: string[] — lucide icon names for categories

---

## Build Timeline (8 Weeks)

| Week | Tasks |
|------|-------|
| 1 | Project setup, types, mock data, layout shell |
| 2 | UI atoms + Dashboard page |
| 3 | Wallet module |
| 4 | Category module |
| 5 | Transaction list + filter + form |
| 6 | Budget module |
| 7 | Profile page + mobile responsive |
| 8 | Polish: empty states, skeletons, final cleanup |

