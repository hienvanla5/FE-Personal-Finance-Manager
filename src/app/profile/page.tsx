'use client'

import { useTranslation } from '@/hooks/useTranslation'
import ProfileCard from '@/components/profile/ProfileCard'
import ProfileForm from '@/components/profile/ProfileForm'
import StatsOverview from '@/components/profile/StatsOverview'

export default function ProfilePage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#2C2C2A]">{t('profileTitle')}</h1>
        <p className="text-sm text-[#6B6B68] mt-1">
          {t('profileSubtitle')}
        </p>
      </div>

      <ProfileCard />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileForm />
        <StatsOverview />
      </div>
    </div>
  )
}
