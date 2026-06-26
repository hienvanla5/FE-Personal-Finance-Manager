import { create } from 'zustand'
import type { Budget } from '@/types'
import { mockBudgets } from '@/data'

interface BudgetState {
  budgets: Budget[]
  addBudget: (budget: Budget) => void
  updateBudget: (id: string, data: Partial<Budget>) => void
  deleteBudget: (id: string) => void
  getBudgetSpent: (budgetId: string, transactions: { categoryId: string; amount: number; date: string; type: string }[]) => number
}

export const useBudgetStore = create<BudgetState>()((set, get) => ({
  budgets: mockBudgets,

  addBudget: (budget) =>
    set((state) => ({
      budgets: [...state.budgets, budget],
    })),

  updateBudget: (id, data) =>
    set((state) => ({
      budgets: state.budgets.map((b) =>
        b.id === id ? { ...b, ...data } : b
      ),
    })),

  deleteBudget: (id) =>
    set((state) => ({
      budgets: state.budgets.filter((b) => b.id !== id),
    })),

  getBudgetSpent: (budgetId, transactions) => {
    const budget = get().budgets.find((b) => b.id === budgetId)
    if (!budget) return 0

    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() // 0-indexed

    // Filter transactions that belong to the budget's category,
    // are expense type, and fall within the current month
    const matching = transactions.filter((t) => {
      const d = new Date(t.date)
      return (
        t.categoryId === budget.categoryId &&
        t.type === 'expense' &&
        d.getFullYear() === currentYear &&
        d.getMonth() === currentMonth
      )
    })

    return matching.reduce((sum, t) => sum + t.amount, 0)
  },
}))