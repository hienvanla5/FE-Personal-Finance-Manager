'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { TransactionType } from '@/types'
import Modal from '@/components/ui/Modal'
import TransactionForm from './TransactionForm'

export default function TransactionFAB() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* FAB button — always visible, fixed bottom-right */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-all duration-200 hover:bg-text-secondary hover:shadow-xl active:scale-95 active:bg-foreground lg:bottom-6"
        aria-label="Add transaction"
      >
        <Plus size={24} />
      </button>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="New Transaction"
      >
        <TransactionForm onClose={() => setIsOpen(false)} />
      </Modal>
    </>
  )
}