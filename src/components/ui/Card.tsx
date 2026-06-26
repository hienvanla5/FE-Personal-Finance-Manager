import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-2xl shadow-sm border border-border bg-card-bg ${className}`}
    >
      {children}
    </div>
  )
}