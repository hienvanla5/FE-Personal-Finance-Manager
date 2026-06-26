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
  color: string
  icon: string
  isDefault: boolean
}

export type TransactionType = 'income' | 'expense' | 'transfer'

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  date: string
  categoryId: string
  walletId: string
  toWalletId?: string
  note: string
  createdAt: string
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
  type: 'income' | 'expense'
  parentId?: string
}

export interface Budget {
  id: string
  categoryId: string
  limit: number
  period: 'monthly' | 'weekly'
  startDate: string
  currency: string
}

export type TransactionWithDetails = Transaction & {
  category: Category
  wallet: Wallet
}

export type BudgetWithProgress = Budget & {
  spent: number
  category: Category
}