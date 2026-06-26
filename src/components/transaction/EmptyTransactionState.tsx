'use client'

import { Receipt, Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useTranslation } from '@/hooks/useTranslation'

interface EmptyTransactionStateProps {
  onAdd?: () => void
}

export default function EmptyTransactionState({ onAdd }: EmptyTransactionStateProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background py-16 px-4">
      <div className="w-14 h-14 rounded-2xl bg-card-surface flex items-center justify-center mb-4">
        <Receipt className="w-7 h-7 text-text-secondary" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">{t('noTransactions')}</h3>
      <p className="text-sm text-text-secondary mb-4">{t('noTransactionsDesc')}</p>
      {onAdd && (
        <Button variant="primary" onClick={onAdd}>
          <Plus size={16} />
          {t('addTransaction')}
        </Button>
      )}
    </div>
  )
}