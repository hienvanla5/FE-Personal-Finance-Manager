'use client'

import Card from '@/components/ui/Card'

function SkeletonBudgetCard() {
  return (
    <Card className="p-4 animate-pulse">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-card-surface" />
            <div className="h-4 w-24 bg-card-surface rounded" />
          </div>
          <div className="h-3 w-28 bg-card-surface rounded" />
        </div>
        <div className="h-2.5 w-full bg-card-surface rounded-full" />
        <div className="flex items-center justify-between">
          <div className="h-3 w-12 bg-card-surface rounded" />
          <div className="h-3 w-16 bg-card-surface rounded" />
        </div>
      </div>
    </Card>
  )
}

export default function SkeletonBudgetList() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <SkeletonBudgetCard key={i} />
      ))}
    </div>
  )
}