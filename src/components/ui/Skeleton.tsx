interface SkeletonProps {
  width?: string | number
  height?: string | number
  className?: string
}

export default function Skeleton({ width, height, className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-card-surface ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  )
}