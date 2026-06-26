'use client'

import { icons } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import type { BudgetWithProgress } from '@/types'
import { formatCurrency } from '@/lib/formatters'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import { Pencil, Trash2 } from 'lucide-react'

interface BudgetCardProps {
  budget: BudgetWithProgress
  onEdit?: () => void
  onDelete?: () => void
}

export default function BudgetCard({ budget, onEdit, onDelete }: BudgetCardProps) {
  const percentUsed = budget.limit > 0 ? (budget.spent / budget.limit) * 100 : 0
  const displayPercent = Math.min(percentUsed, 100)
  const isWarning = percentUsed > 80 && percentUsed <= 100
  const isExceeded = percentUsed > 100

  const IconComponent = budget.category
    ? (icons as Record<string, React.ComponentType<LucideProps>>)[budget.category.icon]
    : null

  const barColor = isExceeded
    ? 'var(--expense)'
    : isWarning
      ? 'var(--budget-warning)'
      : 'var(--income)'

  const periodLabel = budget.period === 'weekly' ? 'Weekly' : 'Monthly'

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card-bg p-4 shadow-sm">
      {/* Header: icon + name + period + buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          {IconComponent && budget.category && (
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: budget.category.color }}
            >
              <IconComponent size={20} className="text-foreground" />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {budget.category?.name ?? 'Unknown'}
            </p>
            <p className="text-xs text-text-secondary">{periodLabel}</p>
          </div>
        </div>

        {/* Edit / Delete buttons */}
        <div className="flex items-center gap-1 shrink-0">
          {onEdit && (
            <button
              onClick={onEdit}
              className="rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-card-surface hover:text-foreground"
              aria-label="Edit budget"
            >
              <Pencil size={16} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-expense hover:text-expense-text"
              aria-label="Delete budget"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2.5 bg-card-surface rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${displayPercent}%`,
            backgroundColor: barColor,
          }}
        />
      </div>

      {/* Amounts + percentage */}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-1.5 min-w-0">
          <span className="truncate text-sm font-semibold text-foreground" title={formatCurrency(budget.spent)}>
            {formatCurrency(budget.spent)}
          </span>
          <span className="shrink-0 text-xs text-text-secondary">
            / {formatCurrency(budget.limit)}
          </span>
        </div>
        <span
          className={cn(
            'shrink-0 text-sm font-medium',
            isExceeded && 'text-expense-text',
            isWarning && !isExceeded && 'text-expense-text',
            !isWarning && !isExceeded && 'text-income-text'
          )}
        >
          {percentUsed.toFixed(0)}%
        </span>
      </div>

      {/* Status label */}
      {isExceeded && (
        <p className="text-xs font-medium text-expense-text -mt-2">
          Exceeded by {formatCurrency(budget.spent - budget.limit)}
        </p>
      )}
    </div>
  )
}