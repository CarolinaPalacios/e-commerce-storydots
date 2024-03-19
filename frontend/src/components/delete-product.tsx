import { useState } from 'react'
import { api } from '../lib/config/api-config'
import { useProductsStore } from '../lib/hooks/use-products-store'
import { Pagination } from './pagination'
import { DeleteProductModal } from './modals/delete-product.modal'
import { Product } from '../lib/api-client'

interface Props {
  products: Product[]
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
  handlePrevPage: () => void
  handleNextPage: () => void
}
export function DeleteProduct({
  products,
  currentPage,
  totalPages,
  setCurrentPage,
  handlePrevPage,
  handleNextPage,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const productsStore = useProductsStore()

  const handleModalOpen = (product: Product) => {
    setProductToDelete(product)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setProductToDelete(null)
  }

  const deleteProductMutation = api.product.deleteProduct.useMutation()

  const handleDelete = async (id?: string) => {
    try {
      await deleteProductMutation.mutateAsync({
        params: { id: id! },
        body: null,
      })
      const updatedProducts = productsStore.products.filter(
        (product) => product.id !== id
      )
      productsStore.set({
        ...productsStore,
        status: 'success',
        products: updatedProducts,
      })
      handleModalClose()
    } catch (error) {
      console.error(`Error deleting product: ${error}`)
      productsStore.set({
        status: 'error',
        products: productsStore.products,
        product: null,
      })
    }
  }

  return (
    <div className='px-24'>
      <h1 className='text-2xl font-medium text-center mx-auto text-[#07074D] rounded-lg py-2 px-4'>
        Eliminar producto
      </h1>
      <ul className='grid grid-cols-4 gap-4 py-20'>
        {products.map((product) => (
          <div
            key={product.id}
            className='flex flex-col p-4 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 w-80 md:w-auto'
          >
            <li>
              <p className='mt-3 font-semibold text-sm text-nowrap'>
                {product.name}
              </p>
            </li>
            <li>
              <p className='text-xs font-light'>{product.description}</p>
            </li>
            <li>
              <img
                src={product.image_url}
                alt={product.name}
                className='w-48 h-48 mx-auto my-2 rounded-xl'
              />
            </li>
            <li className='my-4'>
              <p className='font-bold text-sm'>${product.price}</p>
            </li>

            <button
              onClick={() => handleModalOpen(product)}
              className='bg-[#F4F5FA] px-16 py-3 rounded-full border border-[#F0F0F6] shadow-xl hover:bg-[#E6E6F0] hover:border-[#E6E6F0] hover:duration-300 hover:ease-linear text-sm w-fit mx-auto'
            >
              Eliminar
            </button>
          </div>
        ))}
      </ul>
      <DeleteProductModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        handleDelete={handleDelete}
        product={productToDelete}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageClick={(page) => setCurrentPage(page)}
        onNextClick={handleNextPage}
        onPrevClick={handlePrevPage}
      />
    </div>
  )
}
