import { ProductsStore } from '../lib/hooks/use-products-store'
import { Pagination } from './pagination'
import { ProductCard } from './product-card'

interface ProductsProps {
  products: ProductsStore['products']
  status: ProductsStore['status']
  currentPage: number
  totalPages: number
  onPrevPage: () => void
  onNextPage: () => void
  onPageClick: (page: number) => void
}
export function Products({
  products,
  status,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  onPageClick,
}: ProductsProps) {
  return (
    <div className='flex flex-col'>
      {status === 'loading' && <p>Cargando productos...</p>}
      {status === 'success' && (
        <>
          <ul
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              margin: '30px auto',
              padding: 0,
              listStyle: 'none',
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevClick={onPrevPage}
            onNextClick={onNextPage}
            onPageClick={onPageClick}
          />
        </>
      )}
    </div>
  )
}
