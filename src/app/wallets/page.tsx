import TotalBalance from '@/components/wallet/TotalBalance'
import WalletList from '@/components/wallet/WalletList'

export default function WalletsPage() {
  return (
    <div className="flex flex-col gap-6">
      <TotalBalance />
      <WalletList />
    </div>
  )
}