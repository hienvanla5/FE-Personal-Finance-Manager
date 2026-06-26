import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  className?: string
}

const variantStyles: Record<string, string> = {
  primary:
    'bg-foreground text-background hover:bg-text-secondary active:bg-foreground',
  secondary:
    'border border-border bg-card-bg text-foreground hover:bg-card-surface active:bg-border',
  ghost:
    'text-text-secondary hover:text-foreground hover:bg-card-surface active:bg-transparent',
  danger:
    'bg-expense text-expense-text hover:bg-expense/80 active:bg-expense/90',
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-info focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}