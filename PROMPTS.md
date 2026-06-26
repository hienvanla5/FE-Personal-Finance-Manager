# Cline Prompt Playbook — Personal Finance Manager

> How to use this file:
> Every prompt starts with "Read `.clinerules` and `PLANNING.md`."
> Copy the full prompt and paste it into Cline chat — do not shorten it.
> Run them in order. Review generated code before moving to the next prompt.

---

## WEEK 1 — Setup & Foundation

### PROMPT 01 — Scaffold the project
```
Read `.clinerules` and `PLANNING.md`.

Scaffold a new Next.js 14 project with these steps:
1. Run: npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
2. Install additional packages: zustand @tanstack/react-query recharts lucide-react react-hook-form zod @hookform/resolvers clsx tailwind-merge
3. Create src/lib/utils.ts with a cn() helper using clsx + tailwind-merge
4. Update tailwind.config.ts to add the pastel colors from .clinerules under theme.extend.colors
5. Update src/app/globals.css to define CSS variables for the full pastel palette

Do not create anything else beyond this list.
```

---

### PROMPT 02 — TypeScript types
```
Read `.clinerules` and `PLANNING.md`.

Create src/types/index.ts containing all TypeScript interfaces defined in the "TypeScript Types" section of PLANNING.md.

Also add two utility types:
- TransactionWithDetails: Transaction & { category: Category; wallet: Wallet }
- BudgetWithProgress: Budget & { spent: number; category: Category }

Export all types.
```

---

### PROMPT 03 — Mock data
```
Read `.clinerules` and `PLANNING.md`.

Generate all mock data as described in the "Mock Data Plan" section of PLANNING.md:

1. src/data/mock-user.ts — one user, currency USD
2. src/data/mock-wallets.ts — 5 wallets as described, realistic balances totaling ~$24,000, each with a distinct pastel color
3. src/data/mock-categories.ts — 20 categories (income + expense), each with a unique lucide icon name and pastel color
4. src/data/mock-transactions.ts — 30 transactions spread across the last 3 months, varied types and amounts
5. src/data/mock-budgets.ts — 6 budgets, 2 of them above 80% spent so UI looks interesting
6. src/data/index.ts — re-export everything

All data must be fully type-safe against the interfaces in src/types/index.ts.
```

---

### PROMPT 04 — Zustand stores
```
Read `.clinerules` and `PLANNING.md`.

Create the 4 Zustand stores described in the "Zustand Stores" section of PLANNING.md.
Each store must initialize its state from the corresponding mock data in src/data/.

For useBudgetStore specifically: getBudgetSpent(budgetId) must calculate the total amount of transactions belonging to that budget's category within the current month.

Files to create:
- src/store/useTransactionStore.ts
- src/store/useWalletStore.ts
- src/store/useBudgetStore.ts
- src/store/useCategoryStore.ts
```

---

### PROMPT 05 — Utilities & Layout shell
```
Read `.clinerules` and `PLANNING.md`.

Step 1 — Create utilities:
- src/lib/formatters.ts with formatCurrency, formatDate, formatRelativeDate
- src/lib/constants.ts with PASTEL_COLORS, WALLET_ICONS, CATEGORY_ICONS arrays

Step 2 — Create layout components:
- src/components/layout/Sidebar.tsx — desktop nav, active state highlight, 7 menu items matching the routes in PLANNING.md
- src/components/layout/BottomNav.tsx — mobile nav with 5 primary items
- src/components/layout/Header.tsx — page title on the left, small user avatar on the right
- src/components/layout/PageShell.tsx — wraps Sidebar + Header + children

Step 3 — Update src/app/layout.tsx to use PageShell and wrap with QueryClientProvider.

Sidebar background: #FAF8F5, active item: bg-[#F2EDE8], right border: border-r border-[#E2DDD8].
```

---

## WEEK 2 — Dashboard

### PROMPT 06 — UI atoms
```
Read `.clinerules` and `PLANNING.md`.

Create the following UI atoms in src/components/ui/:

1. Card.tsx — div wrapper with rounded-2xl shadow-sm border border-[#E2DDD8] bg-white, accepts className prop
2. Badge.tsx — small chip, variant: income (mint), expense (blush), neutral (stone), accepts label + icon
3. Button.tsx — variant: primary (dark fill), secondary (outline), ghost (no border), danger (soft red)
4. Input.tsx — styled input with label above and error message below, pastel focus ring
5. Select.tsx — styled select matching Input style
6. Skeleton.tsx — div with animate-pulse bg-[#F2EDE8], accepts width + height prop
7. Modal.tsx — overlay + centered dialog, accepts isOpen, onClose, title, children props

Do not use any external UI library (no shadcn, no radix). Pure Tailwind only.
```

---

### PROMPT 07 — Dashboard page
```
Read `.clinerules` and `PLANNING.md`.

Create the Dashboard page at src/app/dashboard/page.tsx and these components:

1. src/components/dashboard/SummaryCards.tsx
   - 4 cards: Net Worth (sum of all wallet balances), Income This Month, Expenses This Month, Savings (income − expenses)
   - Each card has a lucide icon, formatted currency amount, and % change vs last month
   - Colors: net worth → sky, income → mint, expenses → blush, savings → peach

2. src/components/dashboard/IncomeExpenseChart.tsx
   - Recharts BarChart showing last 6 months
   - Two bars: income (mint #B5E2CF) and expenses (blush #F2B8C6)
   - Formatted tooltip, legend, ResponsiveContainer

3. src/components/dashboard/SpendingPieChart.tsx
   - Recharts PieChart for spending by category this month
   - Colors from category.color in mock data
   - Legend on the right, percentage tooltip

4. src/components/dashboard/RecentTransactions.tsx
   - Last 5 transactions
   - Each row: category icon, category name, wallet name, note, amount (+ green / − soft red), date

5. src/components/dashboard/BudgetOverview.tsx
   - Top 4 active budgets
   - Pastel progress bar, percentage used, soft red warning if > 80%

Assemble all 5 components into a clean grid layout in the dashboard page.
```

---

## WEEK 3 — Wallet

### PROMPT 08 — Wallet module
```
Read `.clinerules` and `PLANNING.md`.

Create the Wallet module:

1. src/components/wallet/WalletCard.tsx
   - Shows: lucide icon, wallet name, wallet type, balance formatted as currency
   - Card background is a light tint of wallet.color
   - Wallet type badge in the top-right corner
   - Edit + delete buttons appear on hover

2. src/components/wallet/TotalBalance.tsx
   - Displays total balance across all wallets in large text
   - Small breakdown by wallet type (cash, bank, saving...)

3. src/components/wallet/WalletForm.tsx
   - Form inside Modal: wallet name, type (select), color picker (PASTEL_COLORS), icon picker (WALLET_ICONS)
   - React Hook Form + Zod validation
   - On submit: calls addWallet or updateWallet from useWalletStore

4. src/components/wallet/WalletList.tsx
   - 2–3 column grid of WalletCards
   - "Add Wallet" button opens WalletForm modal

5. src/app/wallets/page.tsx
   - TotalBalance at the top
   - WalletList below
```

---

## WEEK 4 — Category

### PROMPT 09 — Category module
```
Read `.clinerules` and `PLANNING.md`.

Create the Category module:

1. src/components/category/CategoryBadge.tsx
   - Small chip: lucide icon + name, light background from category.color
   - Size variants: sm | md | lg

2. src/components/category/CategoryForm.tsx
   - Form inside Modal: name, type (income/expense), icon picker as a grid (CATEGORY_ICONS), color picker (PASTEL_COLORS)
   - React Hook Form + Zod

3. src/components/category/CategoryList.tsx
   - Tab switcher: "Income" / "Expense"
   - Grid of larger category badges with edit + delete buttons
   - "Add Category" button

4. src/app/categories/page.tsx — uses CategoryList
```

---

## WEEK 5 — Transaction

### PROMPT 10 — Transaction list & filter
```
Read `.clinerules` and `PLANNING.md`.

Create the Transaction module — display side:

1. src/components/transaction/TransactionItem.tsx
   - Category icon in a pastel circle, category name, small note text, wallet name
   - Right side: amount (+ mint green / − blush red), formatted date
   - Clickable to open detail or edit

2. src/components/transaction/TransactionList.tsx
   - Transactions grouped by date (headers: "Today", "Yesterday", "January 15"...)
   - Each group shows total income and expense for that day
   - Uses TransactionItem

3. src/components/transaction/TransactionFilter.tsx
   - Horizontal filter bar: type (all/income/expense/transfer), month picker, category dropdown, wallet dropdown
   - On mobile: collapses into a single Filter button with a badge showing active filter count

4. src/app/transactions/page.tsx
   - TransactionFilter at the top
   - TransactionList below, filtered via useTransactionStore
```

---

### PROMPT 11 — Transaction form
```
Read `.clinerules` and `PLANNING.md`.

Create src/components/transaction/TransactionForm.tsx:

- Tab selector at the top: Income / Expense / Transfer
- Large amount input with automatic currency formatting as the user types
- Category picker: icon grid, only shows categories matching the selected type
- Wallet picker: dropdown with icon + balance shown
- Date picker (styled date input)
- Note field (textarea)
- For "Transfer" type: show an additional "To Wallet" picker
- On submit: calls addTransaction from the store and updates the affected wallet balance

Also add a FAB (floating action button) to the main layout so this form can be opened from any page.
```

---

## WEEK 6 — Budget

### PROMPT 12 — Budget module
```
Read `.clinerules` and `PLANNING.md`.

Create the Budget module:

1. src/components/budget/BudgetCard.tsx
   - Category icon + name, period (monthly/weekly)
   - Pastel progress bar showing spent / limit
   - Spent and limit amounts formatted as currency
   - Percentage label; bar turns peach if > 80%, blush if > 100%
   - Edit + delete buttons

2. src/components/budget/BudgetForm.tsx
   - Form: category picker (expense only), limit amount, period
   - React Hook Form + Zod

3. src/components/budget/BudgetList.tsx
   - Grid of BudgetCards
   - Small summary row at the top: how many budgets are on track / warning / exceeded

4. src/app/budgets/page.tsx — uses BudgetList
```

---

## WEEK 7 — Profile & Mobile

### PROMPT 13 — Profile page
```
Read `.clinerules` and `PLANNING.md`.

Create the Profile module:

1. src/components/profile/ProfileCard.tsx
   - Avatar (initials fallback if no image), name, email
   - Currency badge, member since date

2. src/components/profile/ProfileForm.tsx
   - Edit form: name, email, preferred currency (USD/EUR/VND), locale
   - React Hook Form + Zod
   - Save button updates the mock user state

3. src/components/profile/StatsOverview.tsx
   - Summary stats: total transactions, total income, total expenses, months active

4. src/app/profile/page.tsx — assembles all three components
```

---

### PROMPT 14 — Responsive & mobile polish
```
Read `.clinerules` and `PLANNING.md`.

Audit and fix responsiveness across the entire app for mobile (< 768px):

1. Sidebar hidden on mobile, BottomNav visible
2. Dashboard grid: 2 columns → 1 column on mobile
3. All Recharts charts must use ResponsiveContainer correctly
4. WalletList grid: 3 col → 2 col → 1 col
5. TransactionFilter collapses on mobile
6. TransactionForm and WalletForm modals go full-screen on mobile (not centered dialog)
7. FAB button sits at bottom-20 on mobile to avoid the BottomNav

Verify no text overflows and long currency amounts are never clipped.
```

---

## WEEK 8 — Polish

### PROMPT 15 — Empty states & loading skeletons
```
Read `.clinerules`.

Add empty states for every list and page when there is no data:
- Transactions: receipt icon, "No transactions yet", "Add your first transaction" button
- Wallets: wallet icon, "No wallets yet", "Add a wallet" button
- Budgets: target icon, "No budgets set", "Create a budget" button
- Dashboard: if no transactions this month, show placeholder charts with a short onboarding message

Add Skeleton loading for:
- SummaryCards (4 skeleton cards)
- TransactionList (5 skeleton rows)
- BudgetList (3 skeleton cards)

Simulate a 500ms loading delay with setTimeout so the skeleton effect is visible.
```

---

### PROMPT 16 — Final cleanup
```
Read `.clinerules`.

Audit the entire project and fix the following:
1. Every currency amount must go through formatCurrency() from lib/formatters.ts — no hardcoded values
2. Every date must use formatDate() or formatRelativeDate()
3. Every list must have a proper key prop using id, not array index
4. No console.log statements remaining
5. All form submit buttons must be disabled while submitting
6. All colors must come from the palette defined in .clinerules — no stray hardcoded hex values
7. Fix all TypeScript errors by running: npx tsc --noEmit

Finally run npm run build to confirm zero build errors.
```

---

## BONUS PROMPTS — Quick features

### Add search to Transactions
```
Read `.clinerules`.

Add a search bar to the Transactions page:
- Text input at the top of the page, debounced 300ms
- Search across: note text, category name, wallet name
- Highlight matched text in results
- Show "No results found" empty state when nothing matches
```

### Fix a specific bug
```
Read `.clinerules`.

The file [filename] has this error: [paste error here]

Analyze the root cause and fix it. Do not change any logic or UI outside the broken section.
```

### Add dark mode
```
Read `.clinerules` and `PLANNING.md`.

Add dark mode support to the entire app:
- Use Tailwind's dark: variant throughout
- Dark palette: background #1C1A18, card #242220, border #383530, text primary #F0EDE8, text secondary #9E9A95
- Income accent stays mint but slightly muted: #6BBF9E
- Expense accent stays blush but slightly muted: #C87A90
- Add a theme toggle button in the Header (sun/moon lucide icon)
- Persist the preference in localStorage
```

