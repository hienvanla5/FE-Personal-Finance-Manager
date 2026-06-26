'use client'

import { useTransactionStore } from '@/store/useTransactionStore'
import { useCategoryStore } from '@/store/useCategoryStore'
import { useWalletStore } from '@/store/useWalletStore'
import { formatCurrency, formatRelativeDate } from '@/lib/formatters'
import Card from '@/components/ui/Card'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { createElement } from 'react'
import { icons as LucideIcons } from 'lucide-react'

function DynamicIcon({ iconName, className }: { iconName: string; className?: string }) {
  const Icon = LucideIcons[iconName as keyof typeof LucideIcons]
  if (!Icon) return null
  return createElement(Icon, { className, size: 16 })
}

export default function RecentTransactions() {
  const transactions = useTransactionStore((s) => s.transactions)
  const categories = useCategoryStore((s) => s.categories)
  const wallets = useWalletStore((s) => s.wallets)

  // Sort by date descending and take last 5
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-foreground">Recent Transactions</h3>
        <span className="text-xs text-text-secondary">Last 5</span>
      </div>
      <div className="space-y-3">
        {recent.map((txn) => {
          const category = categories.find((c) => c.id === txn.categoryId)
          const wallet = wallets.find((w) => w.id === txn.walletId)
          const isIncome = txn.type === 'income'

          return (
            <div
              key={txn.id}
              className="flex items-center gap-3 py-2 border-b border-border last:border-b-0"
            >
              {/* Category icon */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: category?.color ?? '#E2DDD8' + '30' }}
              >
                {category ? (
                  <DynamicIcon
                    iconName={category.icon}
                    className={`w-4 h-4 ${isIncome ? 'text-income-text' : 'text-expense-text'}`}
                  />
                ) : (
                  <div className={`w-4 h-4 ${isIncome ? 'text-income-text' : 'text-expense-text'}`}>
                    {isIncome ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{category?.name ?? txn.note}</p>
                <p className="text-xs text-text-secondary truncate">
                  {wallet?.name}
                  {txn.note ? ` · ${txn.note}` : ''}
                </p>
              </div>

              {/* Amount + date */}
              <div className="text-right shrink-0">
                <p
                  className={`text-sm font-semibold ${
                    isIncome ? 'text-income-text' : 'text-expense-text'
                  }`}
                >
                  {isIncome ? '+' : '-'}{formatCurrency(txn.amount)}
                </p>
                <p className="text-xs text-text-secondary">{formatRelativeDate(txn.date)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}