'use client'

import { useTranslation } from '@/hooks/useTranslation'
import TotalBalance from '@/components/wallet/TotalBalance'
import WalletList from '@/components/wallet/WalletList'

export default function WalletsPage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[#2C2C2A]">{t('walletsTitle')}</h1>
      </div>
      <TotalBalance />
      <WalletList />
    </div>
  )
}
