'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { Inbox, Calendar, CheckSquare } from 'lucide-react'

const navItems = [
  {
    href: '/',
    label: 'All Tasks',
    icon: Inbox,
  },
  {
    href: '/today',
    label: 'Today',
    icon: Calendar,
  },
  {
    href: '/completed',
    label: 'Completed',
    icon: CheckSquare,
  },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block w-64 bg-gray-50 border-r border-gray-200 p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2',
                  isActive
                    ? 'text-blue-700 border-blue-700'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}