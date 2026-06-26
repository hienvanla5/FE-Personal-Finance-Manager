'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'

interface TransactionSearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function TransactionSearchBar({
  value,
  onChange,
}: TransactionSearchBarProps) {
  const [local, setLocal] = useState(value)
  const debounced = useDebounce(local, 300)

  // Sync debounced value up
  useEffect(() => {
    onChange(debounced)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  // Reset local when value is cleared externally (e.g. clearFilters)
  useEffect(() => {
    if (!value) setLocal('')
  }, [value])

  return (
    <div className="relative">
      <Search
        size={16}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary"
      />
      <input
        type="text"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder="Search transactions…"
        className="w-full rounded-xl border border-border bg-card-bg py-2.5 pl-9 pr-9 text-sm text-foreground placeholder-text-secondary transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-info focus:border-info"
      />
      {local && (
        <button
          type="button"
          onClick={() => {
            setLocal('')
            onChange('')
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}