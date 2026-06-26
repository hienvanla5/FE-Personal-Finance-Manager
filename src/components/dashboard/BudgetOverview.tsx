'use client'

import { useMemo } from 'react'
import { useBudgetStore } from '@/store/useBudgetStore'
import { useTransactionStore } from '@/store/useTransactionStore'
import { useCategoryStore } from '@/store/useCategoryStore'
import { formatCurrency } from '@/lib/formatters'
import Card from '@/components/ui/Card'
import { cn } from '@/lib/utils'

export default function BudgetOverview() {
  const budgets = useBudgetStore((s) => s.budgets)
  const getBudgetSpent = useBudgetStore((s) => s.getBudgetSpent)
  const transactions = useTransactionStore((s) => s.transactions)
  const categories = useCategoryStore((s) => s.categories)

  const budgetData = useMemo(() => {
    const data = budgets.map((budget) => {
      const spent = getBudgetSpent(budget.id, transactions)
      const category = categories.find((c) => c.id === budget.categoryId)
      const percentUsed = budget.limit > 0 ? (spent / budget.limit) * 100 : 0
      return {
        ...budget,
        spent,
        category,
        percentUsed: Math.min(percentUsed, 100),
      }
    })

    // Sort by percentUsed descending, take top 4
    data.sort((a, b) => b.percentUsed - a.percentUsed)
    return data.slice(0, 4)
  }, [budgets, getBudgetSpent, transactions, categories])

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-foreground">Budget Overview</h3>
        <span className="text-xs text-text-secondary">Top 4</span>
      </div>
      <div className="space-y-4">
        {budgetData.map((budget) => {
          const isWarning = budget.percentUsed > 80

          return (
            <div key={budget.id}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  {budget.category && (
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: budget.category.color }}
                    />
                  )}
                  <p className="text-sm font-medium text-foreground truncate">
                    {budget.category?.name ?? 'Unknown'}
                  </p>
                </div>
                <p className="text-xs text-text-secondary shrink-0 ml-2 truncate max-w-[160px] sm:max-w-none" title={`${formatCurrency(budget.spent)} / ${formatCurrency(budget.limit)}`}>
                  {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-card-surface rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-300',
                    isWarning ? 'bg-expense' : 'bg-income'
                  )}
                  style={{ width: `${budget.percentUsed}%` }}
                />
              </div>

              <div className="flex items-center justify-between mt-1">
                <span
                  className={cn(
                    'text-xs',
                    isWarning ? 'text-expense-text font-medium' : 'text-text-secondary'
                  )}
                >
                  {budget.percentUsed.toFixed(0)}% used
                </span>
                {isWarning && (
                  <span className="text-xs text-expense-text font-medium">Over budget!</span>
                )}
              </div>
            </div>
          )
        })}

        {budgetData.length === 0 && (
          <p className="text-sm text-text-secondary text-center py-4">No budgets set</p>
        )}
      </div>
    </Card>
  )
}