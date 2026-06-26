'use client'

import { BarChart3, PieChart } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useTranslation } from '@/hooks/useTranslation'

export default function EmptyDashboardState() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      {/* Placeholder charts with onboarding message */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-dashed border-border bg-background p-8 flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-16 h-16 rounded-2xl bg-info/30 flex items-center justify-center mb-4">
            <BarChart3 className="w-8 h-8 text-info" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">{t('noDataTitle')}</h3>
          <p className="text-sm text-text-secondary text-center max-w-xs">
            {t('noDataDesc')}
          </p>
        </div>

        <div className="rounded-2xl border border-dashed border-border bg-background p-8 flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-16 h-16 rounded-2xl bg-info/30 flex items-center justify-center mb-4">
            <PieChart className="w-8 h-8 text-info" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">{t('noDataTitle')}</h3>
          <p className="text-sm text-text-secondary text-center max-w-xs">
            {t('noDataDesc')}
          </p>
        </div>
      </div>

      {/* Onboarding message */}
      <div className="rounded-2xl border border-border bg-income/20 p-6 text-center">
        <h3 className="text-base font-semibold text-foreground mb-2">{t('appName')} 👋</h3>
        <p className="text-sm text-text-secondary max-w-lg mx-auto">
          {t('noDataDesc')}
        </p>
      </div>
    </div>
  )
}
