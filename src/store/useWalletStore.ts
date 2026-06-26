import { create } from 'zustand'
import type { Wallet } from '@/types'
import { mockWallets } from '@/data'

interface WalletState {
  wallets: Wallet[]
  addWallet: (wallet: Wallet) => void
  updateWallet: (id: string, data: Partial<Wallet>) => void
  deleteWallet: (id: string) => void
}

export const useWalletStore = create<WalletState>()((set) => ({
  wallets: mockWallets,

  addWallet: (wallet) =>
    set((state) => ({
      wallets: [...state.wallets, wallet],
    })),

  updateWallet: (id, data) =>
    set((state) => ({
      wallets: state.wallets.map((w) =>
        w.id === id ? { ...w, ...data } : w
      ),
    })),

  deleteWallet: (id) =>
    set((state) => ({
      wallets: state.wallets.filter((w) => w.id !== id),
    })),
}))