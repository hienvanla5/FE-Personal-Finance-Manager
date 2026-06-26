'use client'

import { icons } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CategoryBadgeProps {
  name: string
  icon: string
  color: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeStyles: Record<string, { chip: string; icon: number; label: string }> = {
  sm: { chip: 'gap-1 px-2.5 py-1 text-xs', icon: 14, label: 'text-xs' },
  md: { chip: 'gap-1.5 px-3 py-1.5 text-sm', icon: 16, label: 'text-sm' },
  lg: { chip: 'gap-2 px-4 py-2 text-base', icon: 20, label: 'text-base font-medium' },
}

export default function CategoryBadge({
  name,
  icon,
  color,
  size = 'md',
  className,
}: CategoryBadgeProps) {
  const IconComponent = (icons as Record<string, React.ComponentType<LucideProps>>)[icon]

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-colors',
        sizeStyles[size].chip,
        className
      )}
      style={{ backgroundColor: color, color: getTextColor(color) }}
    >
      {IconComponent && <IconComponent size={sizeStyles[size].icon} />}
      {name}
    </span>
  )
}

/** Picks a readable text color (dark or light) based on background luminance. */
function getTextColor(hex: string): string {
  const c = hex.replace('#', '')
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b
  return luminance > 180 ? 'var(--foreground)' : '#FFFFFF'
}