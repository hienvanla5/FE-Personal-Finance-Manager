'use client'

import { useTranslation } from '@/hooks/useTranslation'
import CategoryList from '@/components/category/CategoryList'

export default function CategoriesPage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[#2C2C2A]">{t('categoriesTitle')}</h1>
        <p className="text-sm text-[#6B6B68] mt-1">{t('categoriesSubtitle')}</p>
      </div>
      <CategoryList />
    </div>
  )
}
