import { StoreApi, create } from 'zustand'
import { Product } from '../api-client'

export type ProductsStore = {
  status: 'loading' | 'success' | 'error'
  products: Product[]
  product: Product | null
  totalCount: number
  totalPages: number
  clear: () => void
  set: StoreApi<ProductsStore>['setState']
}

export const useProductsStore = create<ProductsStore>((set) => ({
  status: 'loading',
  products: [],
  product: null,
  totalCount: 0,
  totalPages: 0,
  clear: () => set({ status: 'loading', products: [], product: null }),
  set: (newData) => set(newData),
}))
