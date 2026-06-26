import { create } from 'zustand'
import type { User } from '@/types'
import { mockUser } from '@/data'

interface UserState {
  user: User
  updateUser: (data: Partial<User>) => void
}

export const useUserStore = create<UserState>()((set) => ({
  user: mockUser,
  updateUser: (data) =>
    set((state) => ({
      user: { ...state.user, ...data },
    })),
}))