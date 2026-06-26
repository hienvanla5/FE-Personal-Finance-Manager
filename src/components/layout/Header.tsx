'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Sun, Moon } from 'lucide-react'
import { useUserStore } from '@/store/useUserStore'
import { useThemeStore } from '@/store/useThemeStore'

/** Map route pathnames to display titles. */
const routeTitles: Record<string, string> = {
  '/': 'Overview',
  '/dashboard': 'Dashboard',
  '/transactions': 'Transactions',
  '/wallets': 'Wallets',
  '/categories': 'Categories',
  '/budgets': 'Budgets',
  '/profile': 'Profile',
}

export default function Header() {
  const pathname = usePathname()
  const title = routeTitles[pathname] ?? 'Finance'
  const { user } = useUserStore()
  const { isDark, toggle } = useThemeStore()

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-background border-b border-border shrink-0">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-text-secondary hover:text-foreground hover:bg-card-surface transition-colors"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-card-surface">
            <Image
              src={user.avatar}
              alt={user.name}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="hidden sm:block text-sm font-medium text-foreground">
            {user.name}
          </span>
        </div>
      </div>
    </header>
  )
}
