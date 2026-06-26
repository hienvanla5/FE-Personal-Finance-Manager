'use client'

import { useState } from 'react'
import { useWalletStore } from '@/store/useWalletStore'
import WalletCard from './WalletCard'
import WalletForm from './WalletForm'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import type { Wallet } from '@/types'
import EmptyWalletState from './EmptyWalletState'

export default function WalletList() {
  const wallets = useWalletStore((s) => s.wallets)
  const deleteWallet = useWalletStore((s) => s.deleteWallet)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingWallet, setEditingWallet] = useState<Wallet | null>(null)

  const openAdd = () => {
    setEditingWallet(null)
    setIsModalOpen(true)
  }

  const openEdit = (wallet: Wallet) => {
    setEditingWallet(wallet)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingWallet(null)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this wallet?')) {
      deleteWallet(id)
    }
  }

  return (
    <section>
      {/* Header + Add button */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Wallets</h2>
        <Button variant="primary" onClick={openAdd}>
          <Plus size={16} />
          Add Wallet
        </Button>
      </div>

      {/* Grid */}
      {wallets.length === 0 ? (
        <EmptyWalletState onAdd={openAdd} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wallets.map((wallet) => (
            <WalletCard
              key={wallet.id}
              wallet={wallet}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingWallet ? 'Edit Wallet' : 'Add Wallet'}>
        <WalletForm wallet={editingWallet} onClose={closeModal} />
      </Modal>
    </section>
  )
}
