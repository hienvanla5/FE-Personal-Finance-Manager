'use client'

import { User, Calendar, CreditCard } from 'lucide-react'
import Card from '@/components/ui/Card'
import { useUserStore } from '@/store/useUserStore'
import { formatDate } from '@/lib/formatters'

export default function ProfileCard() {
  const { user } = useUserStore()

  const initials = user.name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2)

  const currencyFlags: Record<string, string> = {
    USD: '$',
    EUR: '€',
    VND: '₫',
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-5">
        {/* Avatar */}
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-16 w-16 rounded-full object-cover border-2 border-border"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-info text-lg font-bold text-foreground border-2 border-border">
            {initials}
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-foreground truncate">
            {user.name}
          </h2>
          <p className="text-sm text-text-secondary truncate">{user.email}</p>

          <div className="flex items-center gap-4 mt-2 flex-wrap">
            {/* Currency badge */}
            <span className="inline-flex items-center gap-1 rounded-full bg-income px-3 py-0.5 text-xs font-medium text-income-text">
              <CreditCard className="h-3 w-3" />
              {user.currency} {currencyFlags[user.currency] ?? ''}
            </span>

            {/* Member since */}
            <span className="inline-flex items-center gap-1 text-xs text-text-secondary">
              <Calendar className="h-3 w-3" />
              Member since {formatDate(user.createdAt)}
            </span>
          </div>
        </div>

        {/* Larger avatar on desktop */}
        <div className="hidden sm:block">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-20 w-20 rounded-full object-cover border-2 border-border"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-info text-2xl font-bold text-foreground border-2 border-border">
              {initials}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}