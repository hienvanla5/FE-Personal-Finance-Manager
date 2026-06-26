'use client'

import { useTranslation } from '@/hooks/useTranslation'
import BudgetList from '@/components/budget/BudgetList'

export default function BudgetsPage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[#2C2C2A]">{t('budgetsTitle')}</h1>
        <p className="text-sm text-[#6B6B68] mt-1">{t('budgetsSubtitle')}</p>
      </div>
      <BudgetList />
    </div>
  )
}
