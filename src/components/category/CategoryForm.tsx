'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { icons } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import type { Category } from '@/types'
import { useCategoryStore } from '@/store/useCategoryStore'
import { PASTEL_COLORS, CATEGORY_ICONS } from '@/lib/constants'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(30, 'Name is too long'),
  type: z.enum(['income', 'expense']),
  color: z.string().min(1, 'Please pick a color'),
  icon: z.string().min(1, 'Please pick an icon'),
})

type CategoryFormValues = z.infer<typeof categorySchema>

interface CategoryFormProps {
  category?: Category | null
  onClose: () => void
}

export default function CategoryForm({ category, onClose }: CategoryFormProps) {
  const addCategory = useCategoryStore((s) => s.addCategory)
  const updateCategory = useCategoryStore((s) => s.updateCategory)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? '',
      type: category?.type ?? 'expense',
      color: category?.color ?? PASTEL_COLORS[0],
      icon: category?.icon ?? 'CircleDollarSign',
    },
  })

  const selectedColor = watch('color')
  const selectedIcon = watch('icon')
  const selectedType = watch('type')

  const typeOptions = [
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ]

  const onSubmit = (data: CategoryFormValues) => {
    if (category) {
      updateCategory(category.id, data)
    } else {
      const newCategory: Category = {
        id: `cat-${Date.now()}`,
        ...data,
      }
      addCategory(newCategory)
    }
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Name */}
      <Input
        label="Category Name"
        placeholder="e.g. Groceries, Salary..."
        error={errors.name?.message}
        {...register('name')}
      />

      {/* Type toggle */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Type</label>
        <div className="flex gap-2">
          {typeOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setValue('type', opt.value as 'income' | 'expense', { shouldValidate: true })}
              className={`flex-1 rounded-xl border-2 px-4 py-2 text-sm font-medium transition-all ${
                selectedType === opt.value
                  ? opt.value === 'income'
                    ? 'border-income bg-income text-income-text'
                    : 'border-expense bg-expense text-expense-text'
                  : 'border-border bg-card-bg text-text-secondary hover:bg-card-surface'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {errors.type && (
          <span className="text-xs text-expense-text">{errors.type.message}</span>
        )}
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
          {CATEGORY_ICONS.map((iconName) => {
            const IconComponent = (icons as Record<string, React.ComponentType<LucideProps>>)[iconName]
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
          {category ? 'Update Category' : 'Add Category'}
        </Button>
      </div>
    </form>
  )
}