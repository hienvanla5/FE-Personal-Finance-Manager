'use client'

import Card from '@/components/ui/Card'

function SkeletonCard() {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between animate-pulse">
        <div className="space-y-2 flex-1">
          <div className="h-3 w-24 bg-card-surface rounded" />
          <div className="h-6 w-28 bg-card-surface rounded" />
          <div className="h-3 w-20 bg-card-surface rounded" />
        </div>
        <div className="h-10 w-10 rounded-xl bg-card-surface" />
      </div>
    </Card>
  )
}

export default function SkeletonSummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}