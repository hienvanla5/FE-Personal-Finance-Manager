'use client'

import { Wallet, Plus } from 'lucide-react'
import Button from '@/components/ui/Button'

interface EmptyWalletStateProps {
  onAdd?: () => void
}

export default function EmptyWalletState({ onAdd }: EmptyWalletStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background py-16 px-4">
      <div className="w-14 h-14 rounded-2xl bg-card-surface flex items-center justify-center mb-4">
        <Wallet className="w-7 h-7 text-text-secondary" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">No wallets yet</h3>
      <p className="text-sm text-text-secondary mb-4">Add a wallet to keep track of your accounts</p>
      {onAdd && (
        <Button variant="primary" onClick={onAdd}>
          <Plus size={16} />
          Add a wallet
        </Button>
      )}
    </div>
  )
}