'use client'

import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import type { Transaction, Category, Wallet } from '@/types'
import { formatCurrency, formatRelativeDate } from '@/lib/formatters'
import { cn } from '@/lib/utils'
import TransactionItem from './TransactionItem'
import EmptyTransactionState from './EmptyTransactionState'
import SkeletonTransactionList from '@/components/skeleton/SkeletonTransactionList'

interface TransactionListProps {
  transactions: Transaction[]
  categories: Category[]
  wallets: Wallet[]
  searchQuery?: string
  onTransactionClick?: (transaction: Transaction) => void
  onAdd?: () => void
}

interface GroupedDay {
  label: string
  dateKey: string
  transactions: Transaction[]
  totalIncome: number
  totalExpense: number
}

/**
 * Sort ISO date strings descending (most recent first).
 */
function sortDesc(a: string, b: string): number {
  return b.localeCompare(a)
}

export default function TransactionList({
  transactions,
  categories,
  wallets,
  searchQuery = '',
  onTransactionClick,
  onAdd,
}: TransactionListProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const grouped = useMemo(() => {
    // Build lookup maps
    const catMap = new Map<string, Category>()
    for (const c of categories) catMap.set(c.id, c)

    const walletMap = new Map<string, Wallet>()
    for (const w of wallets) walletMap.set(w.id, w)

    // Group by date key (YYYY-MM-DD)
    const groups = new Map<string, Transaction[]>()

    for (const txn of transactions) {
      const dateKey = txn.date.slice(0, 10) // "2026-06-15"
      const list = groups.get(dateKey) || []
      list.push(txn)
      groups.set(dateKey, list)
    }

    // Build sorted array of GroupedDay
    const sorted: GroupedDay[] = Array.from(groups.entries())
      .sort(([a], [b]) => sortDesc(a, b))
      .map(([dateKey, txns]) => {
        let totalIncome = 0
        let totalExpense = 0

        for (const t of txns) {
          if (t.type === 'income') totalIncome += t.amount
          else if (t.type === 'expense') totalExpense += t.amount
        }

        return {
          label: formatRelativeDate(txns[0].date),
          dateKey,
          transactions: txns.sort((a, b) => sortDesc(a.date, b.date)),
          totalIncome,
          totalExpense,
        }
      })

    return { sorted, catMap, walletMap }
  }, [transactions, categories, wallets])

  if (loading) {
    return <SkeletonTransactionList />
  }

  if (transactions.length === 0) {
    if (searchQuery) {
      return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background py-16 px-4">
          <div className="w-14 h-14 rounded-2xl bg-card-surface flex items-center justify-center mb-4">
            <Search className="w-7 h-7 text-text-secondary" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">No results found</h3>
          <p className="text-sm text-text-secondary">
            No transactions match "{searchQuery}"
          </p>
        </div>
      )
    }
    return <EmptyTransactionState onAdd={onAdd} />
  }

  return (
    <div className="space-y-6">
      {grouped.sorted.map((day) => (
        <section key={day.dateKey}>
          {/* Date header */}
          <div className="mb-2 flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-foreground">{day.label}</h3>

            {/* Daily totals */}
            <div className="flex items-center gap-3 text-xs">
              {day.totalIncome > 0 && (
                <span className="text-income-text">
                  +{formatCurrency(day.totalIncome)}
                </span>
              )}
              {day.totalExpense > 0 && (
                <span className="text-expense-text">
                  −{formatCurrency(day.totalExpense)}
                </span>
              )}
            </div>
          </div>

          {/* Transaction items */}
          <div className={cn('space-y-2')}>
            {day.transactions.map((txn) => {
              const category = grouped.catMap.get(txn.categoryId)
              const wallet = grouped.walletMap.get(txn.walletId)
              if (!category || !wallet) return null

              return (
                <TransactionItem
                  key={txn.id}
                  transaction={txn}
                  category={category}
                  wallet={wallet}
                  searchQuery={searchQuery}
                  onClick={() => onTransactionClick?.(txn)}
                />
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}