import { Product } from '../../lib/api-client'

interface Props {
  isOpen: boolean
  onClose: () => void
  handleDelete: (id?: string) => void
  product: Product | null
}

export function DeleteProductModal({
  isOpen,
  onClose,
  handleDelete,
  product,
}: Props) {
  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${
        isOpen ? 'block' : 'hidden'
      }
      h-screen  flex justify-center items-center`}
    >
      <div
        className='bg-black opacity-45 fixed inset-0 transition-opacity'
        onClick={onClose}
      />
      <div className='relative mx-auto  bg-white shadow-2xl rounded-lg md:p-20 transform transition-all md:max-w-xl w-full '>
        <button onClick={onClose} className='absolute top-5 right-5 '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='3'
            stroke='currentColor'
            className='w-6 h-6 cursor-pointer fill-current text-slate-500 hover:text-slate-900'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
        <h1 className='text-3xl font-bold'>Eliminar Producto</h1>
        <p className='text-sm text-gray-500'>
          ¿Estás seguro de que quieres eliminar este producto?
        </p>
        <code>{product?.name}</code>
        <div className='flex flex-row mt-10 space-x-2 justify-evenly'>
          <button
            onClick={() => handleDelete(product?.id)}
            className='w-full py-3 text-sm font-medium text-center text-white transition duration-150 ease-linear bg-red-600 border border-red-600 rounded-lg hover:bg-red-500'
          >
            Sí, eliminar
          </button>
          <button
            onClick={onClose}
            className='w-full py-3 text-sm text-center text-gray-500 transition duration-150 ease-linear bg-white border border-gray-200 rounded-lg hover:bg-gray-100'
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
