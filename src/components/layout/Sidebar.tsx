'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Tags,
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
  { labelKey: 'navDashboard', href: '/dashboard', icon: LayoutDashboard },
  { labelKey: 'navTransactions', href: '/transactions', icon: ArrowLeftRight },
  { labelKey: 'navWallets', href: '/wallets', icon: Wallet },
  { labelKey: 'navCategories', href: '/categories', icon: Tags },
  { labelKey: 'navBudgets', href: '/budgets', icon: PiggyBank },
  { labelKey: 'navProfile', href: '/profile', icon: User },
]

export default function Sidebar() {
  const { t } = useTranslation()
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-background border-r border-border p-4 shrink-0">
      {/* App title */}
      <div className="flex items-center gap-2 px-3 pb-6 pt-2">
        <div className="w-8 h-8 rounded-lg bg-income flex items-center justify-center">
          <PiggyBank className="w-5 h-5 text-foreground" />
        </div>
          <span className="text-lg font-semibold text-foreground tracking-tight">
            {t('appName')}
          </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-card-surface text-foreground'
                  : 'text-text-secondary hover:bg-card-surface/50 hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{t(item.labelKey)}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}