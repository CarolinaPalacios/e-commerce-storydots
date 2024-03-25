import { Product } from '../../lib/api-client'

interface Props {
  isOpen: boolean
  onClose: () => void
  handleUpdate: (id: string) => void
  product: Partial<Product> | undefined
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function UpdateProductModal({
  isOpen,
  onClose,
  handleUpdate,
  product,
  handleInputChange,
}: Props) {
  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${
        isOpen ? 'block' : 'hidden'
      }
      h-screen  flex justify-center items-center px-6 md:px-0`}
    >
      <div
        className='bg-black opacity-45 fixed inset-0 transition-opacity'
        onClick={onClose}
      />

      {product && (
        <div className='relative mx-auto  bg-white shadow-2xl rounded-lg md:p-20 p-6 transform transition-all md:max-w-xl w-full'>
          <h2 className='md:text-lg text-base font-semibold mb-4'>
            Editar Producto
          </h2>
          <div className='flex flex-col space-y-4'>
            <input
              type='text'
              name='name'
              value={product.name}
              onChange={handleInputChange}
              placeholder='Nombre'
              className='w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 md:text-base text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
            />
            <input
              type='text'
              name='description'
              value={product.description}
              onChange={handleInputChange}
              placeholder='Descripción'
              className='w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 md:text-base text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
            />
            <div className='relative'>
              <span className='absolute inset-y-0 left-0 flex items-center md:pl-3 pl-6 md:text-base text-sm font-medium'>
                $
              </span>
              <input
                type='number'
                name='price'
                value={product.price}
                onChange={handleInputChange}
                placeholder='Precio'
                className='w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 md:text-base text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md pl-10'
              />
            </div>
            <input
              type='text'
              name='image_url'
              value={product.image_url}
              onChange={handleInputChange}
              placeholder='URL de imagen'
              className='w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 md:text-base text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
            />
            <button
              onClick={() => {
                handleUpdate(product.id!)
              }}
              className='bg-blue-500 p-2 w-full hover:bg-blue-600 md:text-base text-sm text-slate-100 font-medium rounded-md'
            >
              Actualizar Producto
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
