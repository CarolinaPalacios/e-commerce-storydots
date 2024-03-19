import { useState } from 'react'
import { MdDeleteForever, MdEditSquare, MdAddBox, MdHome } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../lib/hooks/use-auth-store'
import { useSession } from '../lib/hooks/use-session'
import { CreateProduct } from './create-product'
import { DeleteProduct } from './delete-product'
import { UpdateProduct } from './update-product'

export function Dashboard() {
  const { user } = useAuthStore()
  const session = useSession()
  const [activeView, setActiveView] = useState(1)

  const menu = [
    {
      name: 'Editar productos',
      icon: <MdEditSquare style={{ fontSize: '1.5rem' }} />,
    },
    {
      name: 'Eliminar productos',
      icon: <MdDeleteForever style={{ fontSize: '1.5rem' }} />,
    },
    {
      name: 'Crear productos',
      icon: <MdAddBox style={{ fontSize: '1.5rem' }} />,
    },
  ]

  return (
    <div className='h-screen w-full bg-white relative flex overflow-hidden'>
      <aside className='h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white'>
        <Link
          className='h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white'
          to='/'
        >
          {<MdHome style={{ fontSize: '1.5rem' }} />}
        </Link>
        {menu.map((m, i) => (
          <div
            className='h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white'
            onClick={() => {
              setActiveView(i)
            }}
            key={i}
          >
            {m.icon}
          </div>
        ))}
      </aside>

      <div className='w-full h-full flex flex-col justify-between bg-blue-50'>
        <header className='h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-gray-800'>
          <nav>
            <a href='/' className='mr-10 text-gray-600 hover:text-slate-500'>
              Ir al inicio
            </a>
          </nav>

          <div className='flex flex-shrink-0 items-center space-x-4 text-white'>
            <div className='flex flex-col items-end '>
              <div className='text-md font-medium '>{user?.name}</div>
              <div className='text-sm font-regular'>{user?.email}</div>
            </div>

            <img
              src={user?.img || ''}
              alt={user?.name || ''}
              className='h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-blue-400'
            ></img>
            <button
              className='bg-blue-500 text-white px-2 py-1 rounded-md'
              onClick={() => session.signOut()}
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        <main className='max-w-full h-full flex relative overflow-y-hidden'>
          <div className='m-3 text-xl text-gray-900 font-semibold w-full'>
            <div>
              <div className={activeView === 0 ? 'block' : 'hidden'}>
                <UpdateProduct />
              </div>
              <div className={activeView === 1 ? 'block' : 'hidden'}>
                <DeleteProduct />
              </div>
              <div className={activeView === 2 ? 'block' : 'hidden'}>
                <CreateProduct />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
