import { create } from 'zustand'
import type { Transaction } from '@/types'
import { mockTransactions } from '@/data'

export interface TransactionFilters {
  type?: 'income' | 'expense' | 'transfer'
  categoryId?: string
  walletId?: string
  search?: string
  startDate?: string
  endDate?: string
}

interface TransactionState {
  transactions: Transaction[]
  filters: TransactionFilters
  setFilters: (filters: Partial<TransactionFilters>) => void
  clearFilters: () => void
  addTransaction: (transaction: Transaction) => void
  updateTransaction: (id: string, data: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
}

const defaultFilters: TransactionFilters = {}

export const useTransactionStore = create<TransactionState>()((set) => ({
  transactions: mockTransactions,
  filters: defaultFilters,

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  clearFilters: () => set({ filters: defaultFilters }),

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),

  updateTransaction: (id, data) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...data } : t
      ),
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
}))