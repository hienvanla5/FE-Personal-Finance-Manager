'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  PiggyBank,
  User,
  type LucideIcon,
} from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import type { TranslationKeys } from '@/lib/locales/en'

interface NavItem {
  labelKey: TranslationKeys
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { labelKey: 'navHome', href: '/dashboard', icon: LayoutDashboard },
  { labelKey: 'navTransactions', href: '/transactions', icon: ArrowLeftRight },
  { labelKey: 'navWallets', href: '/wallets', icon: Wallet },
  { labelKey: 'navBudgets', href: '/budgets', icon: PiggyBank },
  { labelKey: 'navProfile', href: '/profile', icon: User },
]

export default function BottomNav() {
  const { t } = useTranslation()
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border px-2 pb-safe">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                isActive
                   ? 'text-foreground'
                  : 'text-text-secondary hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{t(item.labelKey)}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}