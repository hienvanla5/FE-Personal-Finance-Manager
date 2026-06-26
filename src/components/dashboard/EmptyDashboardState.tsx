'use client'

import { BarChart3, PieChart } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function EmptyDashboardState() {
  return (
    <div className="space-y-6">
      {/* Placeholder charts with onboarding message */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-dashed border-border bg-background p-8 flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-16 h-16 rounded-2xl bg-info/30 flex items-center justify-center mb-4">
            <BarChart3 className="w-8 h-8 text-info" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">No data yet</h3>
          <p className="text-sm text-text-secondary text-center max-w-xs">
            Income and expense charts will appear here once you start adding transactions.
          </p>
        </div>

        <div className="rounded-2xl border border-dashed border-border bg-background p-8 flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-16 h-16 rounded-2xl bg-info/30 flex items-center justify-center mb-4">
            <PieChart className="w-8 h-8 text-info" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">No spending data</h3>
          <p className="text-sm text-text-secondary text-center max-w-xs">
            Your spending breakdown by category will show here after you log some expenses.
          </p>
        </div>
      </div>

      {/* Onboarding message */}
      <div className="rounded-2xl border border-border bg-income/20 p-6 text-center">
        <h3 className="text-base font-semibold text-foreground mb-2">Welcome to Finance App! 👋</h3>
        <p className="text-sm text-text-secondary max-w-lg mx-auto">
          Start by adding your wallets and transactions. Your dashboard will automatically populate with
          insights, charts, and summaries to help you manage your finances.
        </p>
      </div>
    </div>
  )
}