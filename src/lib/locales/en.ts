const en = {
  // App
  appName: 'Finance',

  // Navigation
  navDashboard: 'Dashboard',
  navTransactions: 'Transactions',
  navWallets: 'Wallets',
  navCategories: 'Categories',
  navBudgets: 'Budgets',
  navProfile: 'Profile',
  navHome: 'Home',

  // Route titles (Header)
  routeOverview: 'Overview',
  routeDashboard: 'Dashboard',
  routeTransactions: 'Transactions',
  routeWallets: 'Wallets',
  routeCategories: 'Categories',
  routeBudgets: 'Budgets',
  routeProfile: 'Profile',

  // Header
  switchToLight: 'Switch to light mode',
  switchToDark: 'Switch to dark mode',
  headerLogout: 'Logout',

  // Profile Page
  profileTitle: 'Profile',
  profileSubtitle: 'Manage your personal information and preferences',
  memberSince: 'Member since',

  // Profile Form
  editProfile: 'Edit Profile',
  changePhoto: 'Change Photo',
  photoHint: 'PNG or JPG. Max 5MB.',
  labelName: 'Name',
  placeholderName: 'Your full name',
  labelEmail: 'Email',
  placeholderEmail: 'your@email.com',
  labelPreferredCurrency: 'Preferred Currency',
  labelLocale: 'Locale',
  optionEnglish: 'English (US)',
  optionVietnamese: 'Tiếng Việt (VN)',
  saveChanges: 'Save Changes',
  nameMinError: 'Name must be at least 2 characters',
  nameMaxError: 'Name must be at most 50 characters',
  emailInvalidError: 'Please enter a valid email address',

  // Stats Overview
  statsOverview: 'Stats Overview',
  totalTransactions: 'Total Transactions',
  totalIncome: 'Total Income',
  totalExpenses: 'Total Expenses',
  monthsActive: 'Months Active',
  month: 'month',
  months: 'months',

  // Transaction Form
  newTransaction: 'New Transaction',
  income: 'Income',
  expense: 'Expense',
  transfer: 'Transfer',
  labelAmount: 'Amount',
  amountRequired: 'Amount is required',
  amountPositive: 'Amount must be greater than 0',
  labelCategory: 'Category',
  categoryRequired: 'Category is required',
  labelDate: 'Date',
  dateRequired: 'Date is required',
  labelNote: 'Note',
  noteOptional: '(optional)',
  noteMaxError: 'Note must be under 500 characters',
  placeholderNote: 'Add a note...',
  labelWallet: 'Wallet',
  labelFromWallet: 'From Wallet',
  labelToWallet: 'To Wallet',
  selectWallet: 'Select a wallet',
  selectDestination: 'Select destination wallet',
  selectDifferentWallet: 'Select a different destination wallet',
  addTransaction: 'Add Transaction',
  addIncome: 'Add Income',
  addExpense: 'Add Expense',
  addTransfer: 'Add Transfer',
  ariaAddTransaction: 'Add transaction',

  // Transaction List
  noTransactions: 'No transactions yet',
  noTransactionsDesc: 'Get started by adding your first transaction.',
  searchPlaceholder: 'Search transactions...',

  // Transaction filters
  filterAll: 'All',
  filterIncome: 'Income',
  filterExpense: 'Expense',
  filterTransfer: 'Transfer',
  filterClear: 'Clear filters',

  // Dashboard
  dashboardTitle: 'Dashboard',
  dashboardSubtitle: 'Your financial overview at a glance',
  netWorth: 'Net Worth',
  incomeThisMonth: 'Income This Month',
  expensesThisMonth: 'Expenses This Month',
  savings: 'Savings',
  vsLastMonth: 'vs last month',

  // Dashboard - Empty state
  noDataTitle: 'No data this month',
  noDataDesc: 'Add some transactions to see your financial overview.',

  // Recent Transactions
  recentTransactions: 'Recent Transactions',
  viewAll: 'View All',

  // Budget
  budgetOverview: 'Budget Overview',
  budgetRemaining: 'remaining',
  budgetOverspent: 'overspent',

  // Categories page
  categoriesTitle: 'Categories',
  categoriesSubtitle: 'Manage your transaction categories',

  // Budgets page
  budgetsTitle: 'Budgets',
  budgetsSubtitle: 'Set and track your spending limits',

  // Wallets page
  totalBalance: 'Total Balance',
  walletsTitle: 'Wallets',

  // Currency options
  currencyUSD: 'USD ($)',
  currencyEUR: 'EUR (€)',
  currencyVND: 'VND (₫)',

  // Profile card
  userCurrency: 'Currency',
  accountCreated: 'Member since',

  // Budget card
  monthlyBudget: 'Monthly Budget',
  weeklyBudget: 'Weekly Budget',
  spent: 'spent',
  of: 'of',

  // General
  loading: 'Loading...',
  error: 'An error occurred',
  retry: 'Retry',
  cancel: 'Cancel',
  confirm: 'Confirm',
  close: 'Close',
  back: 'Back',

  // Income/Expense chart
  incomeVsExpenses: 'Income vs Expenses',
  spendingByCategory: 'Spending by Category',
}

export type TranslationKeys = keyof typeof en
export type TranslationDict = typeof en

export default en