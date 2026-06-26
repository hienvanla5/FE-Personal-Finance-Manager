'use client'

import { useState, useEffect } from 'react'
import { useWalletStore } from '@/store/useWalletStore'
import { useTransactionStore } from '@/store/useTransactionStore'
import { formatCurrency } from '@/lib/formatters'
import { useTranslation } from '@/hooks/useTranslation'
import type { TranslationKeys } from '@/lib/locales/en'
import Card from '@/components/ui/Card'
import SkeletonSummaryCards from '@/components/skeleton/SkeletonSummaryCards'
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react'

interface SummaryCardData {
  labelKey: TranslationKeys
  value: number
  changePercent: number
  icon: React.ReactNode
  bgColor: string
  textColor: string
}

function getMonthKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}`
}

function getMonthlyTotals(transactions: { type: string; amount: number; date: string }[]) {
  const incomeMap = new Map<string, number>()
  const expenseMap = new Map<string, number>()

  for (const t of transactions) {
    if (t.type === 'transfer') continue
    const key = getMonthKey(new Date(t.date))
    const map = t.type === 'income' ? incomeMap : expenseMap
    map.set(key, (map.get(key) || 0) + t.amount)
  }

  return { incomeMap, expenseMap }
}

export default function SummaryCards() {
  const { t } = useTranslation()
  const wallets = useWalletStore((s) => s.wallets)
  const transactions = useTransactionStore((s) => s.transactions)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <SkeletonSummaryCards />
  }

  const now = new Date()
  const currentMonthKey = getMonthKey(now)
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const lastMonthKey = getMonthKey(lastMonth)

  const { incomeMap, expenseMap } = getMonthlyTotals(transactions)

  const incomeThisMonth = incomeMap.get(currentMonthKey) || 0
  const expensesThisMonth = expenseMap.get(currentMonthKey) || 0
  const incomeLastMonth = incomeMap.get(lastMonthKey) || 0
  const expensesLastMonth = expenseMap.get(lastMonthKey) || 0
  const netWorth = wallets.reduce((sum, w) => sum + w.balance, 0)
  const savings = incomeThisMonth - expensesThisMonth

  const incomeChange = incomeLastMonth > 0 ? ((incomeThisMonth - incomeLastMonth) / incomeLastMonth) * 100 : 0
  const expenseChange = expensesLastMonth > 0 ? ((expensesThisMonth - expensesLastMonth) / expensesLastMonth) * 100 : 0

  // Savings vs last month: net savings change
  const lastMonthSavings = incomeLastMonth - expensesLastMonth
  const savingsChange = lastMonthSavings > 0 ? ((savings - lastMonthSavings) / lastMonthSavings) * 100 : 0

  // Net worth change: use netWorth change vs last month (estimate via month delta)
  const lastMonthNetWorth = netWorth - incomeThisMonth + expensesThisMonth
  const netWorthChange = lastMonthNetWorth > 0 ? ((netWorth - lastMonthNetWorth) / lastMonthNetWorth) * 100 : 0

  const cards: SummaryCardData[] = [
    {
      labelKey: 'netWorth',
      value: netWorth,
      changePercent: netWorthChange,
      icon: <Wallet className="w-5 h-5" />,
      bgColor: 'bg-info/20',
      textColor: 'text-foreground',
    },
    {
      labelKey: 'incomeThisMonth',
      value: incomeThisMonth,
      changePercent: incomeChange,
      icon: <TrendingUp className="w-5 h-5" />,
      bgColor: 'bg-income/20',
      textColor: 'text-income-text',
    },
    {
      labelKey: 'expensesThisMonth',
      value: expensesThisMonth,
      changePercent: expenseChange,
      icon: <TrendingDown className="w-5 h-5" />,
      bgColor: 'bg-expense/20',
      textColor: 'text-expense-text',
    },
    {
      labelKey: 'savings',
      value: savings,
      changePercent: savingsChange,
      icon: <PiggyBank className="w-5 h-5" />,
      bgColor: 'bg-budget-warning/20',
      textColor: 'text-foreground',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
        <Card key={card.labelKey} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-text-secondary">{t(card.labelKey)}</p>
              <p className="text-xl font-semibold text-foreground mt-1">
                {formatCurrency(card.value)}
              </p>
              <p className={`text-xs mt-1 ${card.changePercent >= 0 ? 'text-income-text' : 'text-expense-text'}`}>
                {card.changePercent >= 0 ? '+' : ''}{card.changePercent.toFixed(1)}% {t('vsLastMonth')}
              </p>
            </div>
            <div className={`p-2 rounded-xl ${card.bgColor} ${card.textColor}`}>
              {card.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
