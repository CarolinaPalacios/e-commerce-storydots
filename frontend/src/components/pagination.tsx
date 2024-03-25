import React from 'react'
import { MdArrowLeft, MdArrowRight } from 'react-icons/md'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPrevClick: () => void
  onNextClick: () => void
  onPageClick: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPrevClick,
  onNextClick,
  onPageClick,
}) => {
  return (
    <nav className='flex items-center justify-center p-5'>
      <ul className='flex flex-wrap'>
        <li>
          <button
            onClick={onPrevClick}
            disabled={currentPage === 1}
            className='mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300'
          >
            <MdArrowLeft />
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <button
              className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full ${
                page === currentPage
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-transparent text-sm text-blue-gray-500 border border-blue-gray-100 hover:bg-light-300'
              } p-0 transition duration-150 ease-in-out`}
              key={page}
              onClick={() => onPageClick(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={onNextClick}
            disabled={currentPage === totalPages}
            className='mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300'
          >
            <MdArrowRight />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
