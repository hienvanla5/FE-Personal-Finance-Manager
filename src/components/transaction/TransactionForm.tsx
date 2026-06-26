'use client'

import { useState, useEffect, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Plus,
  ArrowRightLeft,
  type LucideIcon,
} from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import type { TransactionType, Category, Wallet } from '@/types'
import { useTransactionStore } from '@/store/useTransactionStore'
import { useWalletStore } from '@/store/useWalletStore'
import { useCategoryStore } from '@/store/useCategoryStore'
import { formatCurrency } from '@/lib/formatters'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function resolveIcon(iconName: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>
  return icons[iconName] || Plus
}

// ---------------------------------------------------------------------------
// Zod schema
// ---------------------------------------------------------------------------

const transactionSchema = z
  .object({
    type: z.enum(['income', 'expense', 'transfer']),
    amount: z
      .string()
      .min(1, 'Amount is required')
      .transform((val) => val.replace(/[^0-9.]/g, ''))
      .pipe(
        z
          .string()
          .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: 'Amount must be greater than 0',
          })
      ),
    rawAmount: z.string().optional(),
    categoryId: z.string().min(1, 'Category is required'),
    walletId: z.string().min(1, 'Wallet is required'),
    toWalletId: z.string().optional(),
    date: z.string().min(1, 'Date is required'),
    note: z.string().max(500, 'Note must be under 500 characters').default(''),
  })
  .refine(
    (data) => {
      if (data.type === 'transfer') {
        return !!data.toWalletId && data.toWalletId !== data.walletId
      }
      return true
    },
    {
      message: 'Select a different destination wallet',
      path: ['toWalletId'],
    }
  )

type TransactionFormValues = z.input<typeof transactionSchema>

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

const TABS: { key: TransactionType; label: string }[] = [
  { key: 'income', label: 'Income' },
  { key: 'expense', label: 'Expense' },
  { key: 'transfer', label: 'Transfer' },
]

const TAB_STYLES: Record<TransactionType, string> = {
  income:
    'data-[state=active]:bg-income data-[state=active]:text-income-text',
  expense:
    'data-[state=active]:bg-expense data-[state=active]:text-expense-text',
  transfer:
    'data-[state=active]:bg-info data-[state=active]:text-foreground',
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface TransactionFormProps {
  onClose: () => void
  defaultType?: TransactionType
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TransactionForm({
  onClose,
  defaultType = 'expense',
}: TransactionFormProps) {
  const addTransaction = useTransactionStore((s) => s.addTransaction)
  const updateWallet = useWalletStore((s) => s.updateWallet)
  const wallets = useWalletStore((s) => s.wallets)
  const categories = useCategoryStore((s) => s.categories)

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: defaultType,
      amount: '',
      categoryId: '',
      walletId: '',
      toWalletId: '',
      date: new Date().toISOString().split('T')[0],
      note: '',
    },
  })

  const selectedType = watch('type')
  const selectedWalletId = watch('walletId')
  const rawAmount = watch('amount')

  // Filter categories by the selected transaction type
  const filteredCategories = categories.filter(
    (c) => c.type === selectedType || c.type === 'expense'
  )

  // Reset category when type changes
  useEffect(() => {
    setValue('categoryId', '')
  }, [selectedType, setValue])

  // Reset toWalletId when switching away from transfer
  useEffect(() => {
    if (selectedType !== 'transfer') {
      setValue('toWalletId', '')
    }
  }, [selectedType, setValue])

  // Currency formatting as user types
  const formatAmountInput = useCallback(
    (value: string): string => {
      const digits = value.replace(/[^0-9.]/g, '')
      const parts = digits.split('.')
      if (parts.length > 2) return parts[0] + '.' + parts.slice(1).join('')
      const intPart = parts[0]
      const decPart = parts[1]
      if (intPart === '') return ''
      const formattedInt = new Intl.NumberFormat('en-US').format(
        parseInt(intPart, 10) || 0
      )
      return decPart !== undefined
        ? `${formattedInt}.${decPart.slice(0, 2)}`
        : formattedInt
    },
    []
  )

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatAmountInput(e.target.value)
      setValue('amount', formatted, { shouldValidate: true })
    },
    [formatAmountInput, setValue]
  )

  // Submit handler
  const onSubmit = (data: TransactionFormValues) => {
    const numericAmount = parseFloat(data.amount.replace(/,/g, ''))

    // Build a deterministic-ish ID
    const id = `txn-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    addTransaction({
      id,
      type: data.type,
      amount: numericAmount,
      date: new Date(data.date).toISOString(),
      categoryId: data.categoryId,
      walletId: data.walletId,
      toWalletId: data.type === 'transfer' ? data.toWalletId : undefined,
      note: data.note ?? '',
      createdAt: new Date().toISOString(),
    })

    // Update wallet balances
    const sourceWallet = wallets.find((w) => w.id === data.walletId)
    if (sourceWallet) {
      let newBalance = sourceWallet.balance
      if (data.type === 'expense') {
        newBalance -= numericAmount
      } else if (data.type === 'transfer') {
        newBalance -= numericAmount
      }
      // Income → no change to source wallet balance (money coming in)
      // but we need to add to the wallet — actually for income, balance increases
      if (data.type === 'income') {
        newBalance += numericAmount
      }
      updateWallet(data.walletId, { balance: newBalance })
    }

    if (data.type === 'transfer' && data.toWalletId) {
      const targetWallet = wallets.find((w) => w.id === data.toWalletId)
      if (targetWallet) {
        updateWallet(data.toWalletId, {
          balance: targetWallet.balance + numericAmount,
        })
      }
    }

    reset()
    onClose()
  }

  const availableWallets = wallets
  const sourceWallet = wallets.find((w) => w.id === selectedWalletId)
  const toWallets = wallets.filter((w) => w.id !== selectedWalletId)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ---- Type Tabs ---- */}
      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <div className="flex rounded-xl bg-card-surface p-1">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                data-state={field.value === tab.key ? 'active' : 'inactive'}
                onClick={() => field.onChange(tab.key)}
                className={cn(
                  'flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 text-text-secondary data-[state=active]:shadow-sm',
                  TAB_STYLES[tab.key]
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      />

      {/* ---- Amount ---- */}
      <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-3xl font-bold text-text-secondary">
          $
        </span>
        <input
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          autoFocus
          {...register('amount')}
          onChange={handleAmountChange}
          className={cn(
            'w-full rounded-2xl border border-border bg-card-bg px-6 py-5 text-right text-4xl font-bold text-foreground placeholder-border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-info pl-14',
            errors.amount && 'border-expense focus:ring-expense'
          )}
        />
        {/* Preview */}
        {rawAmount && !errors.amount && (
          <p className="mt-1 text-right text-xs text-text-secondary">
            {formatCurrency(
              parseFloat(rawAmount.replace(/,/g, '')) || 0
            )}
          </p>
        )}
        {errors.amount && (
          <p className="mt-1 text-right text-xs text-expense-text">
            {errors.amount.message}
          </p>
        )}
      </div>

      {/* ---- Category Picker (icon grid) ---- */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Category
        </label>
        <Controller
          control={control}
          name="categoryId"
          render={({ field }) => (
            <>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
                {filteredCategories.map((cat) => {
                  const Icon = resolveIcon(cat.icon)
                  const isSelected = field.value === cat.id
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => field.onChange(cat.id)}
                      className={cn(
                        'flex flex-col items-center gap-1 rounded-xl p-2 transition-all duration-150',
                        isSelected
                          ? 'ring-2 ring-offset-2'
                          : 'hover:bg-card-surface',
                        isSelected && cat.color
                      )}
                      style={
                        isSelected
                          ? {
                              backgroundColor: cat.color,
                              outlineColor: cat.color,
                            }
                          : {}
                      }
                      title={cat.name}
                    >
                      <Icon size={18} className="shrink-0" />
                      <span className="truncate text-[10px] leading-tight text-foreground">
                        {cat.name}
                      </span>
                    </button>
                  )
                })}
              </div>
              {errors.categoryId && (
                <p className="mt-1 text-xs text-expense-text">
                  {errors.categoryId.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      {/* ---- Wallet Picker ---- */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          {selectedType === 'transfer' ? 'From Wallet' : 'Wallet'}
        </label>
        <Controller
          control={control}
          name="walletId"
          render={({ field }) => (
            <>
              <div className="relative">
                <select
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className={cn(
                    'w-full appearance-none rounded-xl border border-border bg-card-bg px-4 py-3 pr-10 text-sm text-foreground transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-info',
                    errors.walletId &&
                      'border-expense focus:ring-expense'
                  )}
                >
                  <option value="" disabled>
                    Select a wallet
                  </option>
                  {availableWallets.map((w) => {
                    const Icon = resolveIcon(w.icon)
                    return (
                      <option key={w.id} value={w.id}>
                        {w.name} — {formatCurrency(w.balance)}
                      </option>
                    )
                  })}
                </select>
                {/* Custom chevron */}
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg
                    className="h-4 w-4 text-text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {errors.walletId && (
                <p className="mt-1 text-xs text-expense-text">
                  {errors.walletId.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      {/* ---- To Wallet (transfer only) ---- */}
      {selectedType === 'transfer' && (
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            To Wallet
          </label>
          <Controller
            control={control}
            name="toWalletId"
            render={({ field }) => (
              <>
                <div className="relative">
                  <select
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={cn(
                      'w-full appearance-none rounded-xl border border-border bg-card-bg px-4 py-3 pr-10 text-sm text-foreground transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-info',
                      errors.toWalletId &&
                        'border-expense focus:ring-expense'
                    )}
                  >
                    <option value="" disabled>
                      Select destination wallet
                    </option>
                    {toWallets.map((w) => {
                      const Icon = resolveIcon(w.icon)
                      return (
                        <option key={w.id} value={w.id}>
                          {w.name} — {formatCurrency(w.balance)}
                        </option>
                      )
                    })}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                      className="h-4 w-4 text-text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {errors.toWalletId && (
                  <p className="mt-1 text-xs text-expense-text">
                    {errors.toWalletId.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
      )}

      {/* ---- Date ---- */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Date
        </label>
        <input
          type="date"
          {...register('date')}
          className={cn(
            'w-full rounded-xl border border-border bg-card-bg px-4 py-3 text-sm text-foreground transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-info',
            errors.date && 'border-expense focus:ring-expense'
          )}
        />
        {errors.date && (
          <p className="mt-1 text-xs text-expense-text">
            {errors.date.message}
          </p>
        )}
      </div>

      {/* ---- Note ---- */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Note{' '}
          <span className="text-xs text-text-secondary">(optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="Add a note..."
          {...register('note')}
          className={cn(
            'w-full resize-none rounded-xl border border-border bg-card-bg px-4 py-3 text-sm text-foreground placeholder-text-secondary transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-info',
            errors.note && 'border-expense focus:ring-expense'
          )}
        />
        {errors.note && (
          <p className="mt-1 text-xs text-expense-text">
            {errors.note.message}
          </p>
        )}
      </div>

      {/* ---- Submit ---- */}
      <Button
        type="submit"
        variant="primary"
        className="w-full py-3 text-base"
        disabled={isSubmitting}
      >
        {selectedType === 'income'
          ? 'Add Income'
          : selectedType === 'expense'
            ? 'Add Expense'
            : 'Add Transfer'}
      </Button>
    </form>
  )
}