import { CiSquareMore } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { Product } from '../lib/api-client'

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  const navigate = useNavigate()

  return (
    <li
      key={product.id}
      className='mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white  shadow-md duration-300 hover:scale-105 hover:shadow-lg'
    >
      <img
        src={product.image_url}
        alt={product.name}
        className='h-56 w-full object-cover object-center'
      />
      <div className='p-4'>
        <h2 className='mb-2 text-lg font-medium text-gray-900'>
          {product.name}
        </h2>
        <img
          src={product.brand.logo_url}
          alt={product.brand.name}
          className='absolute top-0 text-base font-medium w-10 h-20'
        />

        <div className='flex items-center'>
          <p className='mr-2 text-lg font-semibold text-gray-900 '>
            ${product.price}
          </p>
          <p className='text-base  font-medium text-gray-500 line-through '>
            ${product.price * 2}
          </p>
          <p className='ml-auto text-base font-medium text-green-500'>
            50% off
          </p>
        </div>
        <button
          onClick={() => {
            navigate(`/product/${product.id}`)
          }}
          className='absolute bottom-24 right-2 p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500'
        >
          <CiSquareMore className='w-6 h-6' />
        </button>
      </div>
    </li>
  )
}
