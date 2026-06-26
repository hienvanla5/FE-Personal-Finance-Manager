'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { Wallet } from '@/types'
import { useWalletStore } from '@/store/useWalletStore'
import { PASTEL_COLORS, WALLET_ICONS } from '@/lib/constants'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { icons } from 'lucide-react'

const walletSchema = z.object({
  name: z.string().min(1, 'Wallet name is required').max(30, 'Name is too long'),
  type: z.enum(['cash', 'bank', 'card', 'crypto', 'saving']),
  color: z.string().min(1, 'Please pick a color'),
  icon: z.string().min(1, 'Please pick an icon'),
  currency: z.string().min(1, 'Currency is required'),
})

type WalletFormValues = z.infer<typeof walletSchema>

interface WalletFormProps {
  wallet?: Wallet | null
  onClose: () => void
}

const typeOptions = [
  { value: 'cash', label: 'Cash' },
  { value: 'bank', label: 'Bank' },
  { value: 'card', label: 'Card' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'saving', label: 'Saving' },
]

const currencyOptions = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'VND', label: 'VND (₫)' },
]

export default function WalletForm({ wallet, onClose }: WalletFormProps) {
  const addWallet = useWalletStore((s) => s.addWallet)
  const updateWallet = useWalletStore((s) => s.updateWallet)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<WalletFormValues>({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      name: wallet?.name ?? '',
      type: wallet?.type ?? 'cash',
      color: wallet?.color ?? PASTEL_COLORS[0],
      icon: wallet?.icon ?? 'Wallet',
      currency: wallet?.currency ?? 'USD',
    },
  })

  const selectedColor = watch('color')
  const selectedIcon = watch('icon')

  const onSubmit = (data: WalletFormValues) => {
    if (wallet) {
      updateWallet(wallet.id, data)
    } else {
      const newWallet: Wallet = {
        id: `wallet-${Date.now()}`,
        balance: 0,
        isDefault: false,
        ...data,
      }
      addWallet(newWallet)
    }
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Name */}
      <Input
        label="Wallet Name"
        placeholder="e.g. Cash, Chase Bank..."
        error={errors.name?.message}
        {...register('name')}
      />

      {/* Type + Currency */}
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Type"
          options={typeOptions}
          error={errors.type?.message}
          {...register('type')}
        />
        <Select
          label="Currency"
          options={currencyOptions}
          error={errors.currency?.message}
          {...register('currency')}
        />
      </div>

      {/* Color picker */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Color</label>
        <div className="flex flex-wrap gap-2">
          {PASTEL_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setValue('color', color, { shouldValidate: true })}
              className={`h-8 w-8 rounded-full border-2 transition-all ${
                selectedColor === color
                  ? 'border-foreground scale-110'
                  : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Color ${color}`}
            />
          ))}
        </div>
        {errors.color && (
          <span className="text-xs text-expense-text">{errors.color.message}</span>
        )}
      </div>

      {/* Icon picker */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Icon</label>
        <div className="flex flex-wrap gap-2">
          {WALLET_ICONS.map((iconName) => {
            const IconComponent = (icons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[iconName]
            return (
              <button
                key={iconName}
                type="button"
                onClick={() => setValue('icon', iconName, { shouldValidate: true })}
                className={`flex h-9 w-9 items-center justify-center rounded-xl border-2 transition-all ${
                  selectedIcon === iconName
                    ? 'border-foreground bg-card-surface'
                    : 'border-border hover:bg-card-surface'
                }`}
                aria-label={`Icon ${iconName}`}
              >
                {IconComponent ? (
                  <span className="text-foreground"><IconComponent size={18} /></span>
                ) : (
                  <span className="text-xs text-text-secondary">?</span>
                )}
              </button>
            )
          })}
        </div>
        {errors.icon && (
          <span className="text-xs text-expense-text">{errors.icon.message}</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {wallet ? 'Update Wallet' : 'Add Wallet'}
        </Button>
      </div>
    </form>
  )
}