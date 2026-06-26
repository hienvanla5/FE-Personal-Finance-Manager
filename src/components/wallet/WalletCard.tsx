'use client'

import { icons } from 'lucide-react'
import type { Wallet } from '@/types'
import { formatCurrency } from '@/lib/formatters'
import { Pencil, Trash2 } from 'lucide-react'

interface WalletCardProps {
  wallet: Wallet
  onEdit: (wallet: Wallet) => void
  onDelete: (id: string) => void
}

const typeLabels: Record<string, string> = {
  cash: 'Cash',
  bank: 'Bank',
  card: 'Card',
  crypto: 'Crypto',
  saving: 'Saving',
}

export default function WalletCard({ wallet, onEdit, onDelete }: WalletCardProps) {
  const IconComponent = (icons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[
    wallet.icon
  ]

  return (
    <div
      className="group relative rounded-2xl border border-border p-5 shadow-sm transition-all duration-200 hover:shadow-md"
      style={{ backgroundColor: `${wallet.color}20` }}
    >
      {/* Type badge - top right */}
      <span className="absolute right-3 top-3 rounded-full bg-card-bg/80 px-2.5 py-0.5 text-xs font-medium text-text-secondary shadow-sm">
        {typeLabels[wallet.type] ?? wallet.type}
      </span>

      {/* Edit + Delete buttons - visible on hover */}
      <div className="absolute right-3 top-10 flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <button
          onClick={() => onEdit(wallet)}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-card-bg text-text-secondary shadow-sm transition-colors hover:bg-card-surface hover:text-foreground"
          aria-label={`Edit ${wallet.name}`}
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(wallet.id)}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-card-bg text-text-secondary shadow-sm transition-colors hover:bg-expense hover:text-expense-text"
          aria-label={`Delete ${wallet.name}`}
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Icon */}
      <div
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${wallet.color}40` }}
      >
        {IconComponent ? (
          <span style={{ color: wallet.color }}>
            <IconComponent size={20} />
          </span>
        ) : (
          <span className="text-sm font-bold text-text-secondary">?</span>
        )}
      </div>

      {/* Name */}
      <h3 className="mb-1 truncate text-sm font-semibold text-foreground" title={wallet.name}>{wallet.name}</h3>

      {/* Balance */}
      <p className="truncate text-lg font-bold text-foreground" title={formatCurrency(wallet.balance, wallet.currency)}>
        {formatCurrency(wallet.balance, wallet.currency)}
      </p>
    </div>
  )
}