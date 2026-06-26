'use client'

import { useMemo, useState } from 'react'
import { useTransactionStore } from '@/store/useTransactionStore'
import { useCategoryStore } from '@/store/useCategoryStore'
import { useWalletStore } from '@/store/useWalletStore'
import TransactionFilter from '@/components/transaction/TransactionFilter'
import TransactionSearchBar from '@/components/transaction/TransactionSearchBar'
import TransactionList from '@/components/transaction/TransactionList'

export default function TransactionsPage() {
  const {
    transactions,
    filters,
    setFilters,
    clearFilters,
  } = useTransactionStore()

  const categories = useCategoryStore((s) => s.categories)
  const wallets = useWalletStore((s) => s.wallets)

  const [searchQuery, setSearchQuery] = useState('')

  // Build category and wallet lookup maps for search
  const catMap = useMemo(() => {
    const map = new Map<string, string>()
    for (const c of categories) map.set(c.id, c.name)
    return map
  }, [categories])

  const walletMap = useMemo(() => {
    const map = new Map<string, string>()
    for (const w of wallets) map.set(w.id, w.name)
    return map
  }, [wallets])

  // Apply filters + search client-side
  const filtered = useMemo(() => {
    let result = transactions

    if (filters.type) {
      result = result.filter((t) => t.type === filters.type)
    }

    if (filters.categoryId) {
      result = result.filter((t) => t.categoryId === filters.categoryId)
    }

    if (filters.walletId) {
      result = result.filter((t) => t.walletId === filters.walletId)
    }

    if (filters.startDate) {
      result = result.filter((t) => t.date >= filters.startDate!)
    }

    if (filters.endDate) {
      result = result.filter((t) => t.date <= filters.endDate!)
    }

    // Search across note, category name, and wallet name
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter((t) => {
        const categoryName = catMap.get(t.categoryId) || ''
        const walletName = walletMap.get(t.walletId) || ''
        return (
          t.note.toLowerCase().includes(q) ||
          categoryName.toLowerCase().includes(q) ||
          walletName.toLowerCase().includes(q)
        )
      })
    }

    return result
  }, [transactions, filters, searchQuery, catMap, walletMap])

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-[#2C2C2A]">Transactions</h1>
        <p className="mt-1 text-sm text-[#6B6B68]">
          View and manage all your financial activity
        </p>
      </div>

      {/* Search bar */}
      <TransactionSearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Filter bar */}
      <TransactionFilter
        filters={filters}
        categories={categories}
        wallets={wallets}
        onFilterChange={setFilters}
        onClearFilters={clearFilters}
      />

      {/* Transaction list */}
      <TransactionList
        transactions={filtered}
        categories={categories}
        wallets={wallets}
        searchQuery={searchQuery}
      />
    </div>
  )
}
