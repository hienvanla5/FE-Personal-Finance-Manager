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
import { useLocaleStore } from '@/store/useLocaleStore'
import { useTranslation } from '@/hooks/useTranslation'

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
  const { setLocale } = useLocaleStore()
  const { t } = useTranslation()
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
  const currentLocale = watch('locale')
  const currentCurrency = watch('currency')
  const currentEmail = watch('email')

  // Manual dirty check: compare watched values against the persisted user store
  const isFormDirty =
    currentName !== user.name ||
    currentEmail !== user.email ||
    currentCurrency !== user.currency ||
    currentLocale !== user.locale

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
    // Trigger full UI language switch to match the saved locale
    setLocale(data.locale)
  }

  return (
    <Card className="p-6">
      <h3 className="text-base font-semibold text-foreground mb-4">
        {t('editProfile')}
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
              {t('changePhoto')}
            </button>
            <p className="text-xs text-text-secondary mt-1">
              {t('photoHint')}
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
          label={t('labelName')}
          placeholder={t('placeholderName')}
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label={t('labelEmail')}
          type="email"
          placeholder={t('placeholderEmail')}
          error={errors.email?.message}
          {...register('email')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label={t('labelPreferredCurrency')}
            options={[
              { value: 'USD', label: t('currencyUSD') },
              { value: 'EUR', label: t('currencyEUR') },
              { value: 'VND', label: t('currencyVND') },
            ]}
            error={errors.currency?.message}
            {...register('currency')}
          />

          <Select
            label={t('labelLocale')}
            options={[
              { value: 'en-US', label: t('optionEnglish') },
              { value: 'vi-VN', label: t('optionVietnamese') },
            ]}
            error={errors.locale?.message}
            {...register('locale')}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="primary"
            disabled={!isFormDirty && !avatarFile || isSubmitting}
          >
            <Save className="h-4 w-4" />
            {t('saveChanges')}
          </Button>
        </div>
      </form>
    </Card>
  )
}
