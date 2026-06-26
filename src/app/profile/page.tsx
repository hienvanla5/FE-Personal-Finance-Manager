import ProfileCard from '@/components/profile/ProfileCard'
import ProfileForm from '@/components/profile/ProfileForm'
import StatsOverview from '@/components/profile/StatsOverview'

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#2C2C2A]">Profile</h1>
        <p className="text-sm text-[#6B6B68] mt-1">
          Manage your personal information and preferences
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