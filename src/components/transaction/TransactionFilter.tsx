'use client'

import { useState, useMemo } from 'react'
import type { Category, Wallet } from '@/types'
import type { TransactionFilters } from '@/store/useTransactionStore'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { Filter, X } from 'lucide-react'

interface TransactionFilterProps {
  filters: TransactionFilters
  categories: Category[]
  wallets: Wallet[]
  onFilterChange: (filters: Partial<TransactionFilters>) => void
  onClearFilters: () => void
}

/** Generate month options for the last 12 months */
function monthOptions(): { value: string; label: string }[] {
  const options: { value: string; label: string }[] = []
  const now = new Date()
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    options.push({ value, label })
  }
  return options
}

/** Compute how many active filters exist (excluding empty/undefined) */
function activeFilterCount(filters: TransactionFilters): number {
  let count = 0
  if (filters.type) count++
  if (filters.categoryId) count++
  if (filters.walletId) count++
  if (filters.startDate || filters.endDate) count++
  return count
}

export default function TransactionFilter({
  filters,
  categories,
  wallets,
  onFilterChange,
  onClearFilters,
}: TransactionFilterProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeCount = activeFilterCount(filters)

  /** Current month value derived from startDate / endDate or defaults to current month */
  const monthValue = filters.startDate
    ? filters.startDate.slice(0, 7)
    : `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`

  const handleMonthChange = (value: string) => {
    if (!value) {
      onFilterChange({ startDate: undefined, endDate: undefined })
      return
    }
    const startDate = `${value}-01T00:00:00.000Z`
    const [year, month] = value.split('-').map(Number)
    const lastDay = new Date(year, month, 0).getDate()
    const endDate = `${value}-${String(lastDay).padStart(2, '0')}T23:59:59.999Z`
    onFilterChange({ startDate, endDate })
  }

  const categoryOptions = useMemo(() => {
    const opts: { value: string; label: string }[] = [
      { value: '', label: 'All categories' },
    ]
    for (const c of categories) {
      opts.push({ value: c.id, label: c.name })
    }
    return opts
  }, [categories])

  const walletOptions = useMemo(() => {
    const opts: { value: string; label: string }[] = [
      { value: '', label: 'All wallets' },
    ]
    for (const w of wallets) {
      opts.push({ value: w.id, label: w.name })
    }
    return opts
  }, [wallets])

  const typeOptions: { value: string; label: string }[] = [
    { value: '', label: 'All types' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
    { value: 'transfer', label: 'Transfer' },
  ]

  // Desktop filter bar
  const filterBar = (
    <div className="flex flex-wrap items-center gap-3">
      {/* Type */}
      <Select
        value={filters.type || ''}
        onChange={(e) =>
          onFilterChange({ type: (e.target.value as TransactionFilters['type']) || undefined })
        }
        options={typeOptions}
        className="w-32"
      />

      {/* Month */}
      <Select
        value={monthValue}
        onChange={(e) => handleMonthChange(e.target.value)}
        options={monthOptions()}
        className="w-44"
      />

      {/* Category */}
      <Select
        value={filters.categoryId || ''}
        onChange={(e) =>
          onFilterChange({ categoryId: e.target.value || undefined })
        }
        options={categoryOptions}
        className="w-44"
      />

      {/* Wallet */}
      <Select
        value={filters.walletId || ''}
        onChange={(e) =>
          onFilterChange({ walletId: e.target.value || undefined })
        }
        options={walletOptions}
        className="w-40"
      />

      {/* Clear */}
      {activeCount > 0 && (
        <Button variant="ghost" onClick={onClearFilters} className="shrink-0">
          <X size={16} />
          Clear
        </Button>
      )}
    </div>
  )

  return (
    <>
      {/* Mobile filter button */}
      <div className="sm:hidden">
        <Button
          variant="secondary"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative w-full"
        >
          <Filter size={16} />
          Filters
          {activeCount > 0 && (
            <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs text-background">
              {activeCount}
            </span>
          )}
        </Button>

        {mobileOpen && (
          <div className="mt-3 space-y-3 rounded-2xl border border-border bg-card-surface p-4">
            {/* Type */}
            <Select
              value={filters.type || ''}
              onChange={(e) =>
                onFilterChange({ type: (e.target.value as TransactionFilters['type']) || undefined })
              }
              options={typeOptions}
            />

            {/* Month */}
            <Select
              value={monthValue}
              onChange={(e) => handleMonthChange(e.target.value)}
              options={monthOptions()}
            />

            {/* Category */}
            <Select
              value={filters.categoryId || ''}
              onChange={(e) =>
                onFilterChange({ categoryId: e.target.value || undefined })
              }
              options={categoryOptions}
            />

            {/* Wallet */}
            <Select
              value={filters.walletId || ''}
              onChange={(e) =>
                onFilterChange({ walletId: e.target.value || undefined })
              }
              options={walletOptions}
            />

            {/* Clear */}
            {activeCount > 0 && (
              <Button variant="ghost" onClick={onClearFilters} className="w-full">
                <X size={16} />
                Clear all filters
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Desktop filter bar */}
      <div className="hidden sm:block">{filterBar}</div>
    </>
  )
}