'use client'

import { useMemo } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useTransactionStore } from '@/store/useTransactionStore'
import { useCategoryStore } from '@/store/useCategoryStore'
import { formatCurrency } from '@/lib/formatters'
import Card from '@/components/ui/Card'

interface PieDataItem {
  name: string
  value: number
  color: string
}

export default function SpendingPieChart() {
  const transactions = useTransactionStore((s) => s.transactions)
  const categories = useCategoryStore((s) => s.categories)

  const data = useMemo(() => {
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth()

    // Filter this month's expense transactions only
    const thisMonthExpenses = transactions.filter((t) => {
      const d = new Date(t.date)
      return (
        t.type === 'expense' &&
        d.getFullYear() === currentYear &&
        d.getMonth() === currentMonth
      )
    })

    // Group by category
    const categoryTotals = new Map<string, number>()
    for (const t of thisMonthExpenses) {
      categoryTotals.set(t.categoryId, (categoryTotals.get(t.categoryId) || 0) + t.amount)
    }

    // Map to chart data with category info
    const pieData: PieDataItem[] = []
    for (const [catId, total] of categoryTotals) {
      const cat = categories.find((c) => c.id === catId)
      pieData.push({
        name: cat?.name ?? 'Unknown',
        value: total,
        color: cat?.color ?? '#E2DDD8',
      })
    }

    // Sort by value descending
    pieData.sort((a, b) => b.value - a.value)
    return pieData
  }, [transactions, categories])

  return (
    <Card className="p-6">
      <h3 className="text-base font-semibold text-foreground mb-4">Spending by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
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
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            wrapperStyle={{ fontSize: '11px', color: 'var(--text-secondary)', paddingLeft: '8px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}