'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { BellIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { useRouter } from 'next/navigation'
import { logout } from '../../api/authApi'

const userNavigation = [
  { name: 'Your profile', href: '/profile' },

]

export default function Navbar() {
  const router = useRouter();



  return (
    <div className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm dark:border-white/10 dark:bg-[#222222]">
      {/* Logo */}
      <div className="flex items-center gap-x-4">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="h-8 w-auto dark:hidden"
        />
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="hidden h-8 w-auto dark:block"
        />
      </div>

      {/* Search bar */}
      <form action="#" method="GET" className="flex-1 mx-4">
        <div className="relative">
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="w-full rounded-md border border-gray-200 bg-white py-1.5 pl-8 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none dark:border-white/10 dark:bg-[#222222] dark:text-white"
          />
          <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </form>

      <ThemeToggle />

      {/* Notifications + Profile */}
      <div className="flex items-center gap-x-4">
        <button className="text-gray-400 hover:text-gray-500 dark:hover:text-white">
          <BellIcon className="h-6 w-6" />
        </button>
        <Menu as="div" className="relative">
          <MenuButton className="flex items-center">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=64&h=64&q=80"
              className="h-8 w-8 rounded-full"
            />
            <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-500" />
          </MenuButton>

          <MenuItems className="absolute right-0 mt-2 w-32 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-[#222222]">
            {userNavigation.map((item) => (
              <MenuItem key={item.name}>
                {item.name === 'Sign out' ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-1 text-sm text-gray-700 dark:text-white"
                  >
                    {item.name}
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="block px-3 py-1 text-sm text-gray-700 dark:text-white"
                  >
                    {item.name}
                  </a>
                )}
              </MenuItem>
            ))}
            <MenuItem key="logout">
              <button
                onClick={async () => {
                  await logout();           // clear cookies even if 401
                  router.push("/login");    // redirect
                }}
                className="w-full text-left px-3 py-1 text-sm text-gray-700 dark:text-white"
              >
                Sign out
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  )
}
