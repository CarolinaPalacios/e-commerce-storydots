import { useState } from 'react'
import { api } from '../lib/config/api-config'
import { useProductsStore } from '../lib/hooks/use-products-store'
import { Pagination } from './pagination'
import { Product } from '../lib/api-client'
import { UpdateProductModal } from './modals/update-product.modal'

interface Props {
  products: Product[]
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
  handlePrevPage: () => void
  handleNextPage: () => void
}
export function UpdateProduct({
  products,
  currentPage,
  totalPages,
  setCurrentPage,
  handlePrevPage,
  handleNextPage,
}: Props) {
  const [editingProduct, setEditingProduct] = useState<
    Partial<Product> | undefined
  >(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const productsStore = useProductsStore()

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const updateProductMutation = api.product.updateProduct.useMutation()

  const handleUpdate = async (id: string) => {
    try {
      const updatedProduct = await updateProductMutation.mutateAsync({
        params: { id },
        body: editingProduct,
      })

      const updatedProducts = productsStore.products.map((p) =>
        p.id === editingProduct?.id ? updatedProduct.body : p
      )

      productsStore.set({
        ...productsStore,
        status: 'success',
        products: updatedProducts,
      })
      setEditingProduct(undefined)
      handleModalClose()
    } catch (error) {
      console.error(`Error deleting product: ${error}`)
      productsStore.set({
        status: 'error',
        products: productsStore.products,
      })
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingProduct) return
    const { name, value } = event.target
    setEditingProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }))
  }

  return (
    <div className='md:px-24'>
      <h1 className='md:text-2xl text-lg font-medium text-center text-[#07074D] rounded-lg md:px-4'>
        Actualizar producto
      </h1>
      <ul className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:py-20 md:py-4 py-2'>
        {products.map((product) => (
          <div
            key={product.id}
            className='flex flex-col p-2 md:p-4 rounded-xl bg-white shadow-xl translate-x-4 translate-y-4 w-full h-full md:h-full md:w-auto'
          >
            <li className='flex flex-col flex-grow'>
              <p className='lg:mt-3 font-semibold md:text-sm text-xs md:text-nowrap'>
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
                className='md:w-48 w-24 h-24 md:h-48 mx-auto my-2 rounded-xl'
              />
            </li>
            <li className='lg:my-4'>
              <p className='font-bold text-xs md:text-sm'>${product.price}</p>
            </li>

            <button
              onClick={() => {
                setEditingProduct(product)
                handleModalOpen()
              }}
              className='bg-[#F4F5FA] px-6 md:px-16 py-3 rounded-full border border-[#F0F0F6] shadow-xl hover:bg-[#E6E6F0] hover:border-[#E6E6F0] hover:duration-300 hover:ease-linear text-sm w-fit mx-auto'
            >
              Editar
            </button>
          </div>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageClick={(page) => setCurrentPage(page)}
        onNextClick={handleNextPage}
        onPrevClick={handlePrevPage}
      />

      <UpdateProductModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        handleInputChange={handleInputChange}
        product={editingProduct}
        handleUpdate={handleUpdate}
      />
    </div>
  )
}
