import { useLocaleStore } from '@/store/useLocaleStore'

/**
 * Hook that returns a `t()` function for translating static UI text.
 * Reads the current locale dictionary from the locale store.
 */
export function useTranslation() {
  const dict = useLocaleStore((s) => s.dict)

  /**
   * Look up a translation key and return the localized string.
   * Falls back to the key itself if not found.
   */
  function t(key: keyof typeof dict): string {
    return dict[key] ?? key
  }

  return { t }
}