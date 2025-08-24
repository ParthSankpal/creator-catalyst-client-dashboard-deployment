'use client'

import { useState } from 'react'
import {
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
  Bars3Icon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
  { name: 'Submit', href: '/submit', icon: UsersIcon, current: false },
  { name: 'Challenges', href: '#', icon: FolderIcon, current: false },
  { name: 'Modules', href: '#', icon: CalendarIcon, current: false },
  { name: 'Leaderboard', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Rewards', href: '#', icon: ChartPieIcon, current: false },
  { name: 'Settings', href: '/settings', icon: ChartPieIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <div
      className={classNames(
        collapsed ? 'w-20' : 'w-64',
        'hidden md:fixed md:inset-y-0 md:z-40 md:flex md:flex-col border-r mt-20 border-gray-200 bg-white dark:border-white/10 dark:bg-black/10 transition-all duration-300'
      )}
    >
      {/* Collapse Button */}
      <div className="flex justify-end p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-white/10"
        >
          {collapsed ? (
            <ChevronDoubleRightIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col px-2 pb-4">
        <ul role="list" className="flex flex-1 flex-col gap-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={classNames(
                  item.current
                    ? 'bg-gray-50 text-indigo-600 dark:bg-white/5 dark:text-white'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white',
                  'group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold'
                )}
              >
                <item.icon className="h-6 w-6 shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Settings at Bottom */}
      <div className="p-2 mt-auto">
        <a
          href="#"
          className="group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
        >
          <Cog6ToothIcon className="h-6 w-6 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </a>
      </div>
    </div>
  )
}
