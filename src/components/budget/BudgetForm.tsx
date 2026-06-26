'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { icons } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import type { Budget, Category } from '@/types'
import { useBudgetStore } from '@/store/useBudgetStore'
import { useCategoryStore } from '@/store/useCategoryStore'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'

const budgetSchema = z.object({
  categoryId: z.string().min(1, 'Please select a category'),
  limit: z.number().positive('Limit must be greater than 0'),
  period: z.enum(['monthly', 'weekly']),
})

type BudgetFormValues = z.infer<typeof budgetSchema>

interface BudgetFormProps {
  budget?: Budget | null
  onClose: () => void
}

export default function BudgetForm({ budget, onClose }: BudgetFormProps) {
  const addBudget = useBudgetStore((s) => s.addBudget)
  const updateBudget = useBudgetStore((s) => s.updateBudget)
  const categories = useCategoryStore((s) => s.categories)

  const expenseCategories = categories.filter((c) => c.type === 'expense')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      categoryId: budget?.categoryId ?? '',
      limit: budget?.limit ?? 0,
      period: budget?.period ?? 'monthly',
    },
  })

  const selectedCategoryId = watch('categoryId')
  const selectedCategory = categories.find((c) => c.id === selectedCategoryId)

  const categoryOptions = expenseCategories.map((c) => ({
    value: c.id,
    label: c.name,
  }))

  const periodOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'weekly', label: 'Weekly' },
  ]

  const onSubmit = (data: BudgetFormValues) => {
    if (budget) {
      updateBudget(budget.id, data)
    } else {
      const newBudget: Budget = {
        id: `budget-${Date.now()}`,
        categoryId: data.categoryId,
        limit: data.limit,
        period: data.period,
        startDate: new Date().toISOString(),
        currency: 'USD',
      }
      addBudget(newBudget)
    }
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Category picker */}
      <Select
        label="Category"
        placeholder="Select an expense category"
        options={categoryOptions}
        error={errors.categoryId?.message}
        {...register('categoryId')}
      />

      {/* Preview selected category */}
      {selectedCategory && (
        <div className="flex items-center gap-2 rounded-xl bg-card-surface px-3 py-2">
          {(() => {
            const IconComponent = (icons as Record<string, React.ComponentType<LucideProps>>)[selectedCategory.icon]
            return IconComponent ? (
              <IconComponent size={16} className="text-foreground" />
            ) : null
          })()}
          <span className="text-sm text-foreground">{selectedCategory.name}</span>
        </div>
      )}

      {/* Limit amount */}
      <Input
        label="Limit Amount"
        type="number"
        step="0.01"
        min="0"
        placeholder="e.g. 500.00"
        error={errors.limit?.message}
        {...register('limit', { valueAsNumber: true })}
      />

      {/* Period */}
      <Select
        label="Period"
        options={periodOptions}
        error={errors.period?.message}
        {...register('period')}
      />

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {budget ? 'Update Budget' : 'Add Budget'}
        </Button>
      </div>
    </form>
  )
}