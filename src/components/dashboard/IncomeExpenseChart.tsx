'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useTransactionStore } from '@/store/useTransactionStore'
import Card from '@/components/ui/Card'
import { formatCurrency } from '@/lib/formatters'

function getMonthLabel(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
}

function getMonthKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}`
}

export default function IncomeExpenseChart() {
  const transactions = useTransactionStore((s) => s.transactions)

  const now = new Date()
  const months: { key: string; label: string }[] = []

  // Generate last 6 months
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push({ key: getMonthKey(d), label: getMonthLabel(d) })
  }

  const incomeMap = new Map<string, number>()
  const expenseMap = new Map<string, number>()

  for (const t of transactions) {
    if (t.type === 'transfer') continue
    const key = getMonthKey(new Date(t.date))
    if (t.type === 'income') {
      incomeMap.set(key, (incomeMap.get(key) || 0) + t.amount)
    } else {
      expenseMap.set(key, (expenseMap.get(key) || 0) + t.amount)
    }
  }

  const data = months.map((m) => ({
    month: m.label,
    Income: incomeMap.get(m.key) || 0,
    Expenses: expenseMap.get(m.key) || 0,
  }))

  return (
    <Card className="p-6">
      <h3 className="text-base font-semibold text-foreground mb-4">Income vs Expenses</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
          <YAxis tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
          <Tooltip
            formatter={(value) => [formatCurrency(Number(value))]}
            contentStyle={{
              backgroundColor: 'var(--background)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              fontSize: '13px',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '12px', color: 'var(--text-secondary)' }}
          />
          <Bar dataKey="Income" fill="#B5E2CF" radius={[4, 4, 0, 0]} maxBarSize={40} />
          <Bar dataKey="Expenses" fill="#F2B8C6" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}