import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { api } from '../lib/config/api-config'
// import { signInWithGoogle } from '../lib/config/firebase.config'
// import { useAuthStore } from '../lib/hooks/use-auth-store'
// import { useSession } from '../lib/hooks/use-session'
import { useProducts } from '../lib/hooks/use-products'
import { Products } from '../components/products'
// import { LoginModal } from '../components/modals/login.modal'

export function HomePage() {
  // const session = useSession()
  // const navigate = useNavigate()
  // const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // const authStore = useAuthStore()
  const { fetchProducts, products, status, totalPages } = useProducts(
    undefined,
    currentPage
  )

  // const handleModalOpen = () => {
  //   setIsModalOpen(true)
  // }

  // const handleModalClose = () => {
  //   setIsModalOpen(false)
  // }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // const loginMutation = api.auth.login.useMutation({
  //   onSuccess(data) {
  //     authStore.set({
  //       status: 'authenticated',
  //       user: data.body,
  //     })
  //     navigate('/dashboard')
  //     handleModalClose()
  //   },
  // })

  useEffect(() => {
    fetchProducts.refetch()
  }, [currentPage])

  // async function handleSignIn(): Promise<void> {
  //   try {
  //     const userCredentials = await signInWithGoogle()
  //     const accessToken = await userCredentials.user.getIdToken()
  //     await loginMutation.mutateAsync({
  //       headers: { authorization: `Bearer ${accessToken}` },
  //       body: null,
  //     })
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <div className='container mx-auto px-6 py-3'>
      <nav className='flex items-center justify-between'>
        <div className='hidden w-full text-gray-600 md:flex md:items-center'>
          <svg
            className='h-5 w-5'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.06298 10.063 6.27212 12.2721 6.27212C14.4813 6.27212 16.2721 8.06298 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16755 11.1676 8.27212 12.2721 8.27212C13.3767 8.27212 14.2721 9.16755 14.2721 10.2721Z'
              fill='currentColor'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M5.79417 16.5183C2.19424 13.0909 2.05438 7.39409 5.48178 3.79417C8.90918 0.194243 14.6059 0.054383 18.2059 3.48178C21.8058 6.90918 21.9457 12.6059 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.97318 6.93028 5.17324C9.59603 2.3733 14.0268 2.26452 16.8268 4.93028C19.6267 7.59603 19.7355 12.0268 17.0698 14.8268Z'
              fill='currentColor'
            />
          </svg>
          <span className='mx-1 text-sm'>Argentina</span>
        </div>
        <h1 className='w-full text-gray-700 md:text-center text-2xl font-semibold'>
          E-commerce
        </h1>
        <div className='flex items-center justify-end w-full'>
          {/* {session.status === 'authenticated' ? ( */}
          <nav>
            <a
              href='/dashboard'
              className='mr-10 text-gray-600 hover:text-slate-500'
            >
              Ir al dashboard
            </a>
            {/* <button
                className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'
                onClick={() => session.signOut()}
              >
                Cerrar sesión
              </button> */}
          </nav>
          {/* ) : (
            <button
              className='bg-gray-400 text-white px-4 py-2 rounded-md mr-2'
              onClick={handleModalOpen}
            >
              Iniciar sesión
            </button>
          )} */}
        </div>
      </nav>

      {/* <LoginModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        handleSignIn={handleSignIn}
      /> */}
      <Products
        products={products}
        status={status}
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onPageClick={(page) => setCurrentPage(page)}
      />
    </div>
  )
}
