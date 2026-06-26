'use client'

import { useWalletStore } from '@/store/useWalletStore'
import { formatCurrency } from '@/lib/formatters'

const typeLabels: Record<string, string> = {
  cash: 'Cash',
  bank: 'Bank',
  card: 'Card',
  crypto: 'Crypto',
  saving: 'Saving',
}

export default function TotalBalance() {
  const wallets = useWalletStore((s) => s.wallets)

  const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0)

  // Group by type
  const grouped = wallets.reduce<
    Record<string, { label: string; balance: number; color: string }>
  >((acc, w) => {
    const label = typeLabels[w.type] ?? w.type
    if (!acc[w.type]) {
      acc[w.type] = { label, balance: 0, color: w.color }
    }
    acc[w.type].balance += w.balance
    return acc
  }, {})

  return (
    <div className="rounded-2xl border border-border bg-card-bg p-6 shadow-sm">
      {/* Total balance */}
      <p className="mb-1 text-sm font-medium text-text-secondary">Total Balance</p>
      <p className="mb-5 text-3xl font-bold text-foreground">
        {formatCurrency(totalBalance)}
      </p>

      {/* Breakdown by type */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(grouped).map(([type, data]) => (
          <div
            key={type}
            className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2"
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            <span className="text-xs font-medium text-text-secondary">
              {data.label}
            </span>
            <span className="text-xs font-semibold text-foreground">
              {formatCurrency(data.balance)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}