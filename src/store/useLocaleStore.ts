import { create } from 'zustand'
import type { TranslationDict } from '@/lib/locales/en'
import en from '@/lib/locales/en'
import vi from '@/lib/locales/vi'

const locales: Record<string, TranslationDict> = { en, vi }

interface LocaleState {
  /** The active locale code (e.g. 'en-US', 'vi-VN') */
  localeCode: string
  /** The resolved translation dictionary for the current locale */
  dict: TranslationDict
  /** Update the active locale and its dictionary */
  setLocale: (code: string) => void
}

export const useLocaleStore = create<LocaleState>()((set) => ({
  localeCode: 'en-US',
  dict: en,
  setLocale: (code: string) => {
    const lang = code.startsWith('vi') ? 'vi' : 'en'
    set({ localeCode: code, dict: locales[lang] ?? en })
  },
}))