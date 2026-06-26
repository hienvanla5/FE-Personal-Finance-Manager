'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Camera } from 'lucide-react'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { useUserStore } from '@/store/useUserStore'

const profileSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  currency: z.enum(['USD', 'EUR', 'VND']),
  locale: z.enum(['en-US', 'vi-VN']),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function ProfileForm() {
  const { user, updateUser } = useUserStore()
  const [avatarPreview, setAvatarPreview] = useState<string>(user.avatar)
  const [avatarFile, setAvatarFile] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      currency: user.currency,
      locale: user.locale,
    },
  })

  const currentName = watch('name')

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      setAvatarPreview(dataUrl)
      setAvatarFile(dataUrl)
    }
    reader.readAsDataURL(file)
  }

  function onSubmit(data: ProfileFormValues) {
    updateUser({
      ...data,
      ...(avatarFile ? { avatar: avatarFile } : {}),
    })
  }

  return (
    <Card className="p-6">
      <h3 className="text-base font-semibold text-foreground mb-4">
        Edit Profile
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Avatar upload */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-card-surface">
            <Image
              src={avatarPreview}
              alt="Avatar"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-card-surface text-text-secondary hover:text-foreground hover:bg-border transition-colors"
            >
              <Camera className="h-4 w-4" />
              Change Photo
            </button>
            <p className="text-xs text-text-secondary mt-1">
              PNG or JPG. Max 5MB.
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        <Input
          label="Name"
          placeholder="Your full name"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Preferred Currency"
            options={[
              { value: 'USD', label: 'USD ($)' },
              { value: 'EUR', label: 'EUR (€)' },
              { value: 'VND', label: 'VND (₫)' },
            ]}
            error={errors.currency?.message}
            {...register('currency')}
          />

          <Select
            label="Locale"
            options={[
              { value: 'en-US', label: 'English (US)' },
              { value: 'vi-VN', label: 'Tiếng Việt (VN)' },
            ]}
            error={errors.locale?.message}
            {...register('locale')}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="primary"
            disabled={!isDirty && !avatarFile || isSubmitting}
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  )
}
