'use client'

import { ArrowUpRight, ArrowDownRight, Receipt, Clock } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import Card from '@/components/ui/Card'
import { useTransactionStore } from '@/store/useTransactionStore'
import { useUserStore } from '@/store/useUserStore'
import { formatCurrency } from '@/lib/formatters'

interface StatItem {
  label: string
  value: string
  suffix?: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  bg: string
  iconColor: string
}

export default function StatsOverview() {
  const { transactions } = useTransactionStore()
  const { user } = useUserStore()

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalTransactions = transactions.length

  const createdDate = new Date(user.createdAt)
  const now = new Date()
  const monthsActive =
    (now.getFullYear() - createdDate.getFullYear()) * 12 +
    (now.getMonth() - createdDate.getMonth())

  const stats: StatItem[] = [
    {
      label: 'Total Transactions',
      value: totalTransactions.toString(),
      icon: Receipt,
      bg: 'bg-card-surface',
      iconColor: 'text-text-secondary',
    },
    {
      label: 'Total Income',
      value: formatCurrency(totalIncome, user.currency),
      icon: ArrowUpRight,
      bg: 'bg-income',
      iconColor: 'text-income-text',
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(totalExpenses, user.currency),
      icon: ArrowDownRight,
      bg: 'bg-expense',
      iconColor: 'text-expense-text',
    },
    {
      label: 'Months Active',
      value: `${monthsActive}`,
      suffix: monthsActive === 1 ? 'month' : 'months',
      icon: Clock,
      bg: 'bg-info',
      iconColor: 'text-foreground',
    },
  ]

  return (
    <Card className="p-6">
      <h3 className="text-base font-semibold text-foreground mb-4">
        Stats Overview
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-border p-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}
                >
                  <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-text-secondary truncate">
                    {stat.label}
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-xs font-normal text-text-secondary ml-1">
                        {stat.suffix}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}