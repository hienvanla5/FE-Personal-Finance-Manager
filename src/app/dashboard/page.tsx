'use client'

import { useMemo } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { useTransactionStore } from '@/store/useTransactionStore'
import SummaryCards from '@/components/dashboard/SummaryCards'
import IncomeExpenseChart from '@/components/dashboard/IncomeExpenseChart'
import SpendingPieChart from '@/components/dashboard/SpendingPieChart'
import RecentTransactions from '@/components/dashboard/RecentTransactions'
import BudgetOverview from '@/components/dashboard/BudgetOverview'
import EmptyDashboardState from '@/components/dashboard/EmptyDashboardState'

export default function DashboardPage() {
  const transactions = useTransactionStore((s) => s.transactions)

  const hasThisMonthTransactions = useMemo(() => {
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth()

    return transactions.some((t) => {
      const d = new Date(t.date)
      return d.getFullYear() === currentYear && d.getMonth() === currentMonth
    })
  }, [transactions])

  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#2C2C2A]">{t('dashboardTitle')}</h1>
        <p className="text-sm text-[#6B6B68] mt-1">{t('dashboardSubtitle')}</p>
      </div>

      <SummaryCards />

      {hasThisMonthTransactions ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IncomeExpenseChart />
            <SpendingPieChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentTransactions />
            <BudgetOverview />
          </div>
        </>
      ) : (
        <EmptyDashboardState />
      )}
    </div>
  )
}
