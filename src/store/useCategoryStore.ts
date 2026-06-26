import { create } from 'zustand'
import type { Category } from '@/types'
import { mockCategories } from '@/data'

interface CategoryState {
  categories: Category[]
  addCategory: (category: Category) => void
  updateCategory: (id: string, data: Partial<Category>) => void
  deleteCategory: (id: string) => void
}

export const useCategoryStore = create<CategoryState>()((set) => ({
  categories: mockCategories,

  addCategory: (category) =>
    set((state) => ({
      categories: [...state.categories, category],
    })),

  updateCategory: (id, data) =>
    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === id ? { ...c, ...data } : c
      ),
    })),

  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    })),
}))