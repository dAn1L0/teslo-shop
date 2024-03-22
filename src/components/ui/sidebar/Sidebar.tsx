'use client';
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline } from 'react-icons/io5'
import { SidebarMenu } from './SidebarMenu';
import { useUIStore } from '@/store';
import clsx from 'clsx';
import { logout } from '@/actions';
import { useSession } from 'next-auth/react';


const menuLogin = [
  {
    href: '/auth/login',
    icon: <IoLogInOutline size={28} />,
    text: 'Ingresar'
  },
  {
    href: '/',
    icon: <IoLogOutOutline size={28} />,
    text: 'Salir',
    onClick: {logout}
  },
]
const menus = [
  {
    href: '/profile',
    icon: <IoPersonOutline size={28} />,
    text: 'Profile'
  },
  {
    href: '/orders',
    icon: <IoTicketOutline size={28} />,
    text: 'Orders'
  },
]

const menuAdmin = [
  {
    href: '/admin/products',
    icon: <IoShirtOutline size={28} />,
    text: 'Productos'
  },
  {
    href: '/admin/orders',
    icon: <IoTicketOutline size={28} />,
    text: 'Ordenes'
  },
  {
    href: '/admin/users',
    icon: <IoPeopleOutline size={28} />,
    text: 'usuarios'
  }
]


export const Sidebar = () => {

  const isSidebarOpen = useUIStore( state => state.isSidebarOpen );
  const closeSidebar = useUIStore( state => state.closeSidebar );

  const { data: session } = useSession()
  const isAuthenticated = !!session?.user;
  const isAdmin = (session?.user.role === 'admin');

  return (
    <div>
      {/* black background */}
      { isSidebarOpen && (
        <div
          className='fixed top-0 w-screen h-screen z-10 bg-black opacity-30'
        />
      )}
      {/* blur */}
      { isSidebarOpen && (
        <div
          onClick={ () => closeSidebar() }
          className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
        />
      )}
      {/* side-menu */}
      <nav className={
        clsx(
          "fixed right-0 top-0 w-[350px] h-screen bg-slate-100 z-20 shadow-2xl transform transition-all duration-300 ease-in-out p-2 overflow-y-auto",
          {
            "translate-x-full": !isSidebarOpen,
          }
        )
      }>
        <IoCloseOutline
          size={ 40 }
          className='absolute top-3 right-3 cursor-pointer'
          onClick={ () => closeSidebar() }
        />
        {/* input search */}
        <div className='relative mt-14 '>
          <IoSearchOutline size={20} className='absolute top-2 left-3'/>
          <input
            type="text"
            name="search"
            placeholder='Search'
            id="search"
            className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-[#404040]'
          />
        </div>
        {/* sidebar menu */}
        {
          isAuthenticated && (
            menus.map( menu => (
              <SidebarMenu
                key={ menu.text }
                href={ menu.href }
                icon={ menu.icon }
                text={ menu.text }
                onClick={ () =>  closeSidebar() }
              />
            ))
          )
        }
        {
          menuLogin.map( menu => (
            <SidebarMenu
              key={ menu.text }
              href={ menu.href }
              icon={ menu.icon }
              text={ menu.text }
              isVisible={ isAuthenticated ? menu.text !== 'Ingresar' : menu.text !== 'Salir' }
              onClick={ () =>  { closeSidebar(); menu.onClick?.logout && menu.onClick?.logout() } }
            />
          ))
        }
        {
          isAdmin && (
            <>
              <div className='w-full my-10 h-px bg-[#404040]' />
              {
                menuAdmin.map( menu => (
                  <SidebarMenu
                    key={ menu.text }
                    href={ menu.href }
                    icon={ menu.icon }
                    text={ menu.text }
                    onClick={ () =>  closeSidebar() }
                  />
                ))
              }
            </>
          )
        }
      </nav>
    </div>
  )

}

