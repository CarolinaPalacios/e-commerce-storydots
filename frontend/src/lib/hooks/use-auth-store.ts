import { StoreApi, create } from 'zustand'
import { User } from '../api-client'

export type AuthStore = {
  status: 'loading' | 'authenticated' | 'unauthenticated'
  user: User | null
  clear: () => void
  set: StoreApi<AuthStore>['setState']
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  status: 'loading',
  clear: () => set({ user: null, status: 'unauthenticated' }),
  set: (newData) => set(newData),
}))
