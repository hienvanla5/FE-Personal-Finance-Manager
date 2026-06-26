import { create } from 'zustand'

interface ThemeState {
  isDark: boolean
  init: () => void
  toggle: () => void
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  isDark: false,

  init: () => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = stored === 'dark' || (!stored && prefersDark)
    document.documentElement.classList.toggle('dark', dark)
    set({ isDark: dark })
  },

  toggle: () => {
    const next = !get().isDark
    localStorage.setItem('theme', next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
    set({ isDark: next })
  },
}))