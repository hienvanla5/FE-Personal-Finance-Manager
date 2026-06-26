'use client'

import { type LucideIcon, ArrowRightLeft } from 'lucide-react'
import type { Transaction, TransactionType, Category, Wallet } from '@/types'
import { formatCurrency, formatDate } from '@/lib/formatters'
import { cn } from '@/lib/utils'
import * as LucideIcons from 'lucide-react'
import HighlightText from '@/components/ui/HighlightText'

interface TransactionItemProps {
  transaction: Transaction
  category: Category
  wallet: Wallet
  searchQuery?: string
  onClick?: () => void
}

/**
 * Dynamically resolve a Lucide icon by name.
 * Falls back to ArrowRightLeft for transfers.
 */
function resolveIcon(iconName: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>
  return icons[iconName] || ArrowRightLeft
}

/** Background circle color by transaction type */
function typeCircleColor(type: TransactionType): string {
  switch (type) {
    case 'income':
      return 'bg-income text-income-text'
    case 'expense':
      return 'bg-expense text-expense-text'
    case 'transfer':
      return 'bg-info text-foreground'
  }
}

/** Amount text color by transaction type */
function typeAmountColor(type: TransactionType): string {
  switch (type) {
    case 'income':
      return 'text-income-text'
    case 'expense':
      return 'text-expense-text'
    case 'transfer':
      return 'text-foreground'
  }
}

/** Amount prefix character */
function amountPrefix(type: TransactionType): string {
  return type === 'expense' ? '−' : '+'
}

export default function TransactionItem({
  transaction,
  category,
  wallet,
  searchQuery = '',
  onClick,
}: TransactionItemProps) {
  const Icon = resolveIcon(category.icon)
  const isTransfer = transaction.type === 'transfer'
  const displayName = isTransfer ? `Transfer to ${wallet.name}` : category.name

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl bg-card-bg px-4 py-3 text-left shadow-sm border border-border transition-colors hover:bg-card-surface active:bg-border cursor-pointer"
    >
      {/* Category icon circle */}
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
          typeCircleColor(transaction.type),
        )}
      >
        <Icon size={18} />
      </div>

      {/* Category name / note / wallet */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          <HighlightText text={displayName} highlight={searchQuery} />
        </p>
        {transaction.note && (
          <p className="truncate text-xs text-text-secondary">
            <HighlightText text={transaction.note} highlight={searchQuery} />
          </p>
        )}
        <p className="mt-0.5 text-xs text-text-secondary/70">
          <HighlightText text={wallet.name} highlight={searchQuery} />
        </p>
      </div>

      {/* Amount + date */}
      <div className="shrink-0 text-right">
        <p className={cn('text-sm font-semibold', typeAmountColor(transaction.type))}>
          {amountPrefix(transaction.type)}
          {formatCurrency(transaction.amount)}
        </p>
        <p className="mt-0.5 text-xs text-text-secondary">{formatDate(transaction.date)}</p>
      </div>
    </button>
  )
}