'use client'

import { useState } from 'react'
import { icons } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useCategoryStore } from '@/store/useCategoryStore'
import CategoryBadge from './CategoryBadge'
import CategoryForm from './CategoryForm'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { Category } from '@/types'

type TabValue = 'income' | 'expense'

export default function CategoryList() {
  const categories = useCategoryStore((s) => s.categories)
  const deleteCategory = useCategoryStore((s) => s.deleteCategory)

  const [activeTab, setActiveTab] = useState<TabValue>('expense')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const filteredCategories = categories.filter((c) => c.type === activeTab)

  const openAdd = () => {
    setEditingCategory(null)
    setIsModalOpen(true)
  }

  const openEdit = (category: Category) => {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingCategory(null)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id)
    }
  }

  const tabs: { value: TabValue; label: string }[] = [
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ]

  return (
    <section>
      {/* Header + Add button */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Categories</h2>
        <Button variant="primary" onClick={openAdd}>
          <Plus size={16} />
          Add Category
        </Button>
      </div>

      {/* Tab switcher */}
      <div className="mb-6 flex gap-1 rounded-xl bg-card-surface p-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all',
              activeTab === tab.value
                ? 'bg-card-bg text-foreground shadow-sm'
                : 'text-text-secondary hover:text-foreground'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredCategories.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background py-16">
          <p className="text-sm text-text-secondary">
            No {activeTab} categories yet
          </p>
          <Button variant="secondary" className="mt-3" onClick={openAdd}>
            <Plus size={16} />
            Create your first category
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onEdit={() => openEdit(cat)}
              onDelete={() => handleDelete(cat.id)}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingCategory ? 'Edit Category' : 'Add Category'}
      >
        <CategoryForm category={editingCategory} onClose={closeModal} />
      </Modal>
    </section>
  )
}

/* ─── CategoryCard ─── */

interface CategoryCardProps {
  category: Category
  onEdit: () => void
  onDelete: () => void
}

function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  const IconComponent = (icons as Record<string, React.ComponentType<LucideProps>>)[category.icon]

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card-bg p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Icon circle */}
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: category.color }}
      >
        {IconComponent ? (
          <IconComponent size={20} className="text-foreground" />
        ) : (
          <span className="text-xs text-text-secondary">?</span>
        )}
      </div>

      {/* Name & badge */}
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-sm font-medium text-foreground">{category.name}</span>
        <CategoryBadge
          name={category.type === 'income' ? 'Income' : 'Expense'}
          icon={category.type === 'income' ? 'TrendingUp' : 'TrendingDown'}
          color={category.type === 'income' ? 'var(--income)' : 'var(--expense)'}
          size="sm"
        />
      </div>

      {/* Actions */}
      <div className="flex shrink-0 gap-1">
        <button
          onClick={onEdit}
          className="rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-card-surface hover:text-foreground"
          aria-label="Edit category"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={onDelete}
          className="rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-expense hover:text-expense-text"
          aria-label="Delete category"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}