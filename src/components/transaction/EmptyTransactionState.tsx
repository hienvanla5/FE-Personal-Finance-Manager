'use client'

import { Receipt, Plus } from 'lucide-react'
import Button from '@/components/ui/Button'

interface EmptyTransactionStateProps {
  onAdd?: () => void
}

export default function EmptyTransactionState({ onAdd }: EmptyTransactionStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background py-16 px-4">
      <div className="w-14 h-14 rounded-2xl bg-card-surface flex items-center justify-center mb-4">
        <Receipt className="w-7 h-7 text-text-secondary" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">No transactions yet</h3>
      <p className="text-sm text-text-secondary mb-4">Add your first transaction to start tracking</p>
      {onAdd && (
        <Button variant="primary" onClick={onAdd}>
          <Plus size={16} />
          Add your first transaction
        </Button>
      )}
    </div>
  )
}