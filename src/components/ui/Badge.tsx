import { ReactNode } from 'react'

interface BadgeProps {
  label: string
  icon?: ReactNode
  variant?: 'income' | 'expense' | 'neutral'
}

const variantStyles: Record<string, string> = {
  income: 'bg-income text-income-text',
  expense: 'bg-expense text-expense-text',
  neutral: 'bg-card-surface text-text-secondary',
}

export default function Badge({ label, icon, variant = 'neutral' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${variantStyles[variant]}`}
    >
      {icon && <span className="h-3.5 w-3.5">{icon}</span>}
      {label}
    </span>
  )
}