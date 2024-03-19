import { StoreApi, create } from 'zustand'
import { Brand } from '../api-client'

export type BrandStore = {
  status: 'loading' | 'success' | 'error'
  brands: Brand[]
  brand: Brand | null
  clear: () => void
  set: StoreApi<BrandStore>['setState']
}

export const useBrandStore = create<BrandStore>((set) => ({
  status: 'loading',
  brands: [],
  brand: null,
  clear: () => set({ status: 'loading', brand: null }),
  set: (newData) => set(newData),
}))
