'use client'

import { ArrowUpRight, ArrowDownRight, Receipt, Clock } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import Card from '@/components/ui/Card'
import { useTransactionStore } from '@/store/useTransactionStore'
import { useUserStore } from '@/store/useUserStore'
import { useTranslation } from '@/hooks/useTranslation'
import { formatCurrency } from '@/lib/formatters'
import type { TranslationKeys } from '@/lib/locales/en'

interface StatItem {
  labelKey: TranslationKeys
  value: string
  suffixKey?: TranslationKeys
  icon: ComponentType<SVGProps<SVGSVGElement>>
  bg: string
  iconColor: string
}

export default function StatsOverview() {
  const { transactions } = useTransactionStore()
  const { user } = useUserStore()
  const { t } = useTranslation()

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
      labelKey: 'totalTransactions',
      value: totalTransactions.toString(),
      icon: Receipt,
      bg: 'bg-card-surface',
      iconColor: 'text-text-secondary',
    },
    {
      labelKey: 'totalIncome',
      value: formatCurrency(totalIncome, user.currency),
      icon: ArrowUpRight,
      bg: 'bg-income',
      iconColor: 'text-income-text',
    },
    {
      labelKey: 'totalExpenses',
      value: formatCurrency(totalExpenses, user.currency),
      icon: ArrowDownRight,
      bg: 'bg-expense',
      iconColor: 'text-expense-text',
    },
    {
      labelKey: 'monthsActive',
      value: `${monthsActive}`,
      suffixKey: monthsActive === 1 ? 'month' : 'months',
      icon: Clock,
      bg: 'bg-info',
      iconColor: 'text-foreground',
    },
  ]

  return (
    <Card className="p-6">
      <h3 className="text-base font-semibold text-foreground mb-4">
        {t('statsOverview')}
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.labelKey}
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
                    {t(stat.labelKey)}
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {stat.value}
                    {stat.suffixKey && (
                      <span className="text-xs font-normal text-text-secondary ml-1">
                        {t(stat.suffixKey)}
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