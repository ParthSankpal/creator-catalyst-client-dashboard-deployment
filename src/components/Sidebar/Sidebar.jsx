'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react'
import {
  Bars3Icon,
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]

const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/* Mobile Sidebar */}
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50   lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-gray-900/80" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition ease-in-out">
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                  <XMarkIcon className="h-6 w-6 text-white" />
                </button>
              </div>
            </TransitionChild>

            <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 dark:bg-gray-900">
              {/* Nav Links */}
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-50 text-indigo-600 dark:bg-white/5 dark:text-white'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white',
                              'group flex gap-x-3 rounded-md p-2 text-sm font-semibold'
                            )}
                          >
                            <item.icon className="h-6 w-6 shrink-0" />
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>

                  {/* Teams */}
                  <li>
                    <div className="text-xs font-semibold text-gray-400">Your teams</div>
                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                      {teams.map((team) => (
                        <li key={team.name}>
                          <a
                            href={team.href}
                            className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-xs font-medium dark:bg-white/5">
                              {team.initial}
                            </span>
                            <span className="truncate">{team.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>

                  <li className="mt-auto">
                    <a
                      href="#"
                      className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
                    >
                      <Cog6ToothIcon className="h-6 w-6 shrink-0" />
                      Settings
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop Sidebar */}
      <div className="hidden mt-20 lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col border-r border-gray-200 bg-white dark:border-white/10 dark:bg-black/10">
        <nav className="flex flex-1 flex-col px-6 pb-4 pt-6">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-50 text-indigo-600 dark:bg-white/5 dark:text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white',
                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold'
                  )}
                >
                  <item.icon className="h-6 w-6 shrink-0" />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile trigger button (for Navbar) */}
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden p-2 text-gray-700 dark:text-gray-400"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
    </>
  )
}
