/**
 * Format a number as currency with the given currency code.
 * Example: formatCurrency(1500, 'USD') → "$1,500.00"
 *          formatCurrency(1500000, 'VND') → "1,500.000 ₫"
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  try {
    const locale = currency === 'VND' ? 'vi-VN' : 'en-US'
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: currency === 'VND' ? 0 : 2,
      maximumFractionDigits: currency === 'VND' ? 0 : 2,
    }).format(amount)
  } catch {
    // Fallback for unsupported currency codes
    return `${amount.toFixed(2)} ${currency}`
  }
}

/**
 * Format an ISO date string to a human-readable date.
 * Example: formatDate("2025-01-15T08:00:00.000Z") → "January 15, 2025"
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format an ISO date string to a relative description.
 * Example: formatRelativeDate(today) → "Today"
 *          formatRelativeDate(yesterday) → "Yesterday"
 *          formatRelativeDate(3 days ago) → "3 days ago"
 */
export function formatRelativeDate(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  const diffTime = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`

  // Fall back to full date for older dates
  return formatDate(isoString)
}