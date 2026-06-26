'use client'

import { Crosshair, Plus } from 'lucide-react'
import Button from '@/components/ui/Button'

interface EmptyBudgetStateProps {
  onCreate?: () => void
}

export default function EmptyBudgetState({ onCreate }: EmptyBudgetStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background py-16 px-4">
      <div className="w-14 h-14 rounded-2xl bg-card-surface flex items-center justify-center mb-4">
        <Crosshair className="w-7 h-7 text-text-secondary" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">No budgets set</h3>
      <p className="text-sm text-text-secondary mb-4">Create a budget to take control of your spending</p>
      {onCreate && (
        <Button variant="primary" onClick={onCreate}>
          <Plus size={16} />
          Create a budget
        </Button>
      )}
    </div>
  )
}