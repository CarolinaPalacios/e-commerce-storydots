import { useEffect, useState } from 'react'
import { useBrands } from '../lib/hooks/use-brands'
import { api } from '../lib/config/api-config'
import { useProductsStore } from '../lib/hooks/use-products-store'
import { Product } from '../lib/api-client'

const INITIAL_STATE: Omit<Product, 'id'> = {
  name: '',
  description: '',
  image_url: '',
  price: 0,
  brand_id: '',
  brand: {
    id: '',
    name: '',
    logo_url: '',
    products: [],
  },
}

export const CreateProduct = () => {
  const [product, setProduct] = useState(INITIAL_STATE)
  const [selectedBrand, setSelectedBrand] = useState('')

  const productsStore = useProductsStore()
  const { getBrands, brands } = useBrands()

  const createProductMutation = api.product.createProduct.useMutation()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const parsedValue = name === 'price' ? parseFloat(value) : value
    setProduct({ ...product, [name]: name === 'price' ? parsedValue : value })
  }

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const createdProduct = await createProductMutation.mutateAsync({
      body: product,
    })
    productsStore.set({
      status: 'success',
      products: [...productsStore.products, createdProduct.body],
      product: createdProduct.body,
    })
    setProduct(INITIAL_STATE)
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBrandId = event.target.value
    const selectedBrand = brands.find((brand) => brand.id === selectedBrandId)

    setSelectedBrand(selectedBrandId)

    setProduct({
      ...product,
      brand_id: selectedBrandId,
      brand: {
        ...selectedBrand,
        products: selectedBrand?.products || [],
      },
    })
  }

  useEffect(() => {
    getBrands()
  }, [])

  return (
    <div className='flex items-center justify-center p-12'>
      <div className='mx-auto w-full max-w-[550px]'>
        <h1 className='text-2xl font-medium text-center mx-auto text-[#07074D] rounded-lg py-2 px-4'>
          Crear Producto
        </h1>

        <form onSubmit={submitForm} className='mt-10'>
          <div className='-mx-3 flex flex-wrap'>
            <div className='w-full px-3 sm:w-1/2'>
              <div className='mb-5'>
                <label
                  htmlFor='name'
                  className='mb-3 block text-base font-medium text-[#07074D]'
                >
                  Nombre
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Nombre del producto'
                  value={product.name}
                  onChange={handleInputChange}
                  className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                />
              </div>
            </div>
            <div className='w-full px-3 sm:w-1/2'>
              <div className='mb-5'>
                <label
                  htmlFor='price'
                  className='mb-3 block text-base font-medium text-[#07074D]'
                >
                  Precio
                </label>
                <input
                  type='number'
                  name='price'
                  id='price'
                  value={product.price}
                  onChange={handleInputChange}
                  className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                />
              </div>
            </div>
          </div>
          <div className='mb-5'>
            <label
              htmlFor='image_url'
              className='mb-3 block text-base font-medium text-[#07074D]'
            >
              Imágen
            </label>
            <input
              type='text'
              name='image_url'
              id='image_url'
              placeholder='URL de la imágen'
              value={product.image_url}
              onChange={handleInputChange}
              className='w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
            />
          </div>
          <div className='mb-5'>
            <label
              htmlFor='description'
              className='mb-3 block text-base font-medium text-[#07074D]'
            >
              Descripción
            </label>
            <input
              name='description'
              id='description'
              placeholder='Descripción del producto'
              value={product.description}
              onChange={handleInputChange}
              className='w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
            />
          </div>
          <div className='mb-5'>
            <label
              htmlFor='brand'
              className='mb-3 block text-base font-medium text-[#07074D]'
            >
              Marca
            </label>
            <select
              name='brand'
              id='brand'
              value={selectedBrand}
              onChange={handleSelectChange}
              className='w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
            >
              <option value=''>Elige una marca</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type='submit'
            className='bg-blue-500 p-2 w-full hover:bg-blue-600 text-slate-100 font-medium rounded-md'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
