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

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

// Đã xóa mục Overview ở đây
const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
  { label: 'Wallets', href: '/wallets', icon: Wallet },
  { label: 'Categories', href: '/categories', icon: Tags },
  { label: 'Budgets', href: '/budgets', icon: PiggyBank },
  { label: 'Profile', href: '/profile', icon: User },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-background border-r border-border p-4 shrink-0">
      {/* App title */}
      <div className="flex items-center gap-2 px-3 pb-6 pt-2">
        <div className="w-8 h-8 rounded-lg bg-income flex items-center justify-center">
          <PiggyBank className="w-5 h-5 text-foreground" />
        </div>
        <span className="text-lg font-semibold text-foreground tracking-tight">
          Finance
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
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}