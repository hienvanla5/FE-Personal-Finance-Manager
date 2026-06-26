'use client'

import { useEffect, useMemo, useState } from 'react'
import { icons } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { Plus } from 'lucide-react'
import { useBudgetStore } from '@/store/useBudgetStore'
import { useTransactionStore } from '@/store/useTransactionStore'
import { useCategoryStore } from '@/store/useCategoryStore'
import type { BudgetWithProgress, Budget } from '@/types'
import BudgetCard from '@/components/budget/BudgetCard'
import BudgetForm from '@/components/budget/BudgetForm'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import SkeletonBudgetList from '@/components/skeleton/SkeletonBudgetList'
import EmptyBudgetState from './EmptyBudgetState'

export default function BudgetList() {
  const budgets = useBudgetStore((s) => s.budgets)
  const addBudget = useBudgetStore((s) => s.addBudget)
  const updateBudget = useBudgetStore((s) => s.updateBudget)
  const deleteBudget = useBudgetStore((s) => s.deleteBudget)
  const getBudgetSpent = useBudgetStore((s) => s.getBudgetSpent)
  const transactions = useTransactionStore((s) => s.transactions)
  const categories = useCategoryStore((s) => s.categories)

  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const budgetData: BudgetWithProgress[] = useMemo(() => {
    return budgets
      .map((b) => ({
        ...b,
        spent: getBudgetSpent(b.id, transactions),
        category: categories.find((c) => c.id === b.categoryId),
      }))
      .filter((b): b is BudgetWithProgress => b.category !== undefined)
  }, [budgets, getBudgetSpent, transactions, categories])

  const summary = useMemo(() => {
    let onTrack = 0
    let warning = 0
    let exceeded = 0

    budgetData.forEach((b) => {
      const pct = b.limit > 0 ? (b.spent / b.limit) * 100 : 0
      if (pct > 100) exceeded++
      else if (pct > 80) warning++
      else onTrack++
    })

    return { onTrack, warning, exceeded }
  }, [budgetData])

  const handleAdd = () => {
    setEditingBudget(null)
    setModalOpen(true)
  }

  const handleEdit = (budget: Budget) => {
    setEditingBudget(budget)
    setModalOpen(true)
  }

  const handleDelete = (id: string) => {
    deleteBudget(id)
  }

  const handleClose = () => {
    setModalOpen(false)
    setEditingBudget(null)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header + Add button */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Budgets</h1>
        <Button onClick={handleAdd}>
          <Plus size={18} />
          Add Budget
        </Button>
      </div>

      {/* Summary row */}
      {!loading && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-border bg-income/30 p-4 text-center">
            <p className="text-2xl font-bold text-income-text">{summary.onTrack}</p>
            <p className="text-xs text-income-text font-medium mt-1">On Track</p>
          </div>
          <div className="rounded-2xl border border-border bg-budget-warning/40 p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{summary.warning}</p>
            <p className="text-xs text-foreground font-medium mt-1">Warning</p>
          </div>
          <div className="rounded-2xl border border-border bg-expense/30 p-4 text-center">
            <p className="text-2xl font-bold text-expense-text">{summary.exceeded}</p>
            <p className="text-xs text-expense-text font-medium mt-1">Exceeded</p>
          </div>
        </div>
      )}

      {/* Budget grid or skeleton / empty state */}
      {loading ? (
        <SkeletonBudgetList />
      ) : budgetData.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {budgetData.map((budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              onEdit={() => handleEdit(budget)}
              onDelete={() => handleDelete(budget.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyBudgetState onCreate={handleAdd} />
      )}

      {/* Add / Edit modal */}
      <Modal
        isOpen={modalOpen}
        onClose={handleClose}
        title={editingBudget ? 'Edit Budget' : 'Add Budget'}
      >
        <BudgetForm budget={editingBudget} onClose={handleClose} />
      </Modal>
    </div>
  )
}