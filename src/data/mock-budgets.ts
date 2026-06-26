import type { Budget } from '@/types'

const now = new Date()
const year = now.getFullYear()
const month = now.getMonth()

/**
 * Helper to produce an ISO date for the first of a given month offset.
 */
function startOfMonth(monthsAgo: number): string {
  const d = new Date(year, month - monthsAgo, 1, 0, 0, 0)
  return d.toISOString()
}

export const mockBudgets: Budget[] = [
  {
    id: 'budget-001',
    categoryId: 'cat-expense-008', // Rent
    limit: 1500,
    period: 'monthly',
    startDate: startOfMonth(3),
    currency: 'USD',
  },
  {
    id: 'budget-002',
    categoryId: 'cat-expense-001', // Food & Dining
    limit: 100,
    period: 'monthly',
    startDate: startOfMonth(3),
    currency: 'USD',
  },
  {
    id: 'budget-003',
    categoryId: 'cat-expense-002', // Groceries
    limit: 250,
    period: 'monthly',
    startDate: startOfMonth(3),
    currency: 'USD',
  },
  {
    id: 'budget-004',
    categoryId: 'cat-expense-003', // Transport
    limit: 100,
    period: 'monthly',
    startDate: startOfMonth(3),
    currency: 'USD',
  },
  {
    id: 'budget-005',
    categoryId: 'cat-expense-005', // Entertainment
    limit: 150,
    period: 'monthly',
    startDate: startOfMonth(3),
    currency: 'USD',
  },
  {
    id: 'budget-006',
    categoryId: 'cat-expense-010', // Subscriptions
    limit: 60,
    period: 'monthly',
    startDate: startOfMonth(3),
    currency: 'USD',
  },
]