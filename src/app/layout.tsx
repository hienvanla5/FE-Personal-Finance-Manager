'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import PageShell from '@/components/layout/PageShell'
import { useThemeStore } from '@/store/useThemeStore'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

function ThemeInit() {
  const init = useThemeStore((s) => s.init)
  useEffect(() => { init() }, [init])
  return null
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
          },
        },
      })
  )

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning
    >
      <body className="min-h-full">
        <ThemeInit />
        <QueryClientProvider client={queryClient}>
          <PageShell>{children}</PageShell>
        </QueryClientProvider>
      </body>
    </html>
  )
}