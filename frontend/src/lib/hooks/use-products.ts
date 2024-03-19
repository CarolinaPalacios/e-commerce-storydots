import { useNavigate } from 'react-router-dom'
import { useProductsStore, ProductsStore } from './use-products-store'
import { api } from '../config/api-config'
import { UseQueryResult } from '@tanstack/react-query'
import { Product } from '../api-client'

type UseProductsReturn = {
  products: ProductsStore['products']
  status: ProductsStore['status']
  product: ProductsStore['product']
  totalCount: ProductsStore['totalCount']
  totalPages: ProductsStore['totalPages']
  fetchProducts: UseQueryResult<{
    body: { products: Product[]; count: number; pages: number }
  }>
  fetchProduct: UseQueryResult<{
    body: Product
  }>
  clearProducts: () => void
}

export function useProducts(
  id?: string,
  page: number = 1,
  pageSize: number = 12
): UseProductsReturn {
  const productsStore = useProductsStore()
  const navigate = useNavigate()

  const fetchProducts = api.product.getAllProducts.useQuery(
    ['getAllProducts'],
    { query: { page, pageSize } },
    {
      onSuccess(data) {
        productsStore.set({
          status: 'success',
          products: data.body.products,
          product: null,
          totalCount: data.body.count,
          totalPages: data.body.pages,
        })
      },
      onError(error) {
        if (error.status === 500) {
          navigate('/500')
        }
        console.error(`Error fetching products: ${error}`)
        productsStore.set({
          status: 'error',
          products: [],
          product: null,
        })
      },
    }
  )

  const fetchProduct = api.product.getProduct.useQuery(
    ['getProduct', id],
    { params: { id: id! } },
    {
      onSuccess(data) {
        productsStore.set({
          status: 'success',
          product: data.body,
        })
      },
      onError(error) {
        console.error(`Error fetching product: ${error}`)
        navigate('/')
        productsStore.set({
          status: 'error',
          product: null,
        })
      },
    }
  )

  const clearProducts = () => {
    productsStore.set({
      status: 'loading',
      products: [],
      product: null,
    })
  }

  return {
    products: productsStore.products,
    status: productsStore.status,
    product: productsStore.product,
    totalCount: productsStore.totalCount,
    totalPages: productsStore.totalPages,
    fetchProduct,
    fetchProducts,
    clearProducts,
  }
}
