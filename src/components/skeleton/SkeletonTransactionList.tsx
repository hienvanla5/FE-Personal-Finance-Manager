'use client'

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-border last:border-b-0 animate-pulse">
      <div className="w-9 h-9 rounded-xl bg-card-surface shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3.5 w-32 bg-card-surface rounded" />
        <div className="h-3 w-24 bg-card-surface rounded" />
      </div>
      <div className="text-right space-y-1.5">
        <div className="h-3.5 w-16 bg-card-surface rounded ml-auto" />
        <div className="h-3 w-12 bg-card-surface rounded ml-auto" />
      </div>
    </div>
  )
}

export default function SkeletonTransactionList() {
  return (
    <div className="divide-y divide-border">
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  )
}