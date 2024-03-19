import { useNavigate } from 'react-router-dom'
import { useBrandStore, BrandStore } from './use-brand-store'
import { api } from '../config/api-config'

type UseBrandsReturn = {
  brands: BrandStore['brands']
  brand: BrandStore['brand']
  status: BrandStore['status']
  getBrands: () => void
  getProductsByBrand: () => void
}

export function useBrands(): UseBrandsReturn {
// id?: string
  const navigate = useNavigate()
  const brandStore = useBrandStore()

  const fetchBrands = api.brand.getAllBrands.useQuery(
    ['getAllBrands'],
    undefined,
    {
      onSuccess(data) {
        brandStore.set({
          status: 'success',
          brands: data.body.brands,
          brand: null,
        })
      },
      onError(error) {
        if (error.status === 500) {
          navigate('/500')
        }
        console.error(`Error fetching brands: ${error}`)
        brandStore.set({
          status: 'error',
          brands: [],
          brand: null,
        })
      },
    }
  )

  // const fetchProductsByBrand = api.brand.getProductsByBrand.useQuery(
  //   ['getProductsByBrand', id],
  //   { params: { id } },
  //   {
  //     onSuccess(data) {
  //       brandStore.set({
  //         status: 'success',
  //         brand: {
  //           products: data.body.products,
  //         },
  //       });
  //     },
  //     onError(error) {
  //       console.error(`Error fetching products by brand: ${{ error }}`);
  //       brandStore.set({
  //         status: 'error',
  //         brand: null,
  //       });
  //     },
  //   }
  // );

  return {
    brands: brandStore.brands,
    brand: brandStore.brand,
    status: brandStore.status,
    getBrands: () => {
      fetchBrands.refetch()
    },
    getProductsByBrand: () => {},
    // {
    //   fetchProductsByBrand.refetch();
    // },
  }
}
