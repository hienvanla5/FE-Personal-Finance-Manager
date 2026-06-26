'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save } from 'lucide-react'
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

  const {
    register,
    handleSubmit,
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

  function onSubmit(data: ProfileFormValues) {
    updateUser(data)
  }

  return (
    <Card className="p-6">
      <h3 className="text-base font-semibold text-foreground mb-4">
        Edit Profile
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            disabled={!isDirty || isSubmitting}
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  )
}