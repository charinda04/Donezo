'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { Inbox, Calendar, CheckSquare } from 'lucide-react'

const navItems = [
  {
    href: '/',
    label: 'Inbox',
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
      <nav 
        className="hidden md:block w-80 border-r flex-shrink-0" 
        style={{ 
          backgroundColor: 'var(--todoist-sidebar)', 
          borderColor: 'var(--todoist-border)' 
        }}
      >
        <div className="p-6">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors',
                    isActive
                      ? 'font-medium'
                      : ''
                  )}
                  style={{
                    color: isActive ? 'var(--todoist-red)' : 'var(--todoist-text-light)',
                    backgroundColor: isActive ? 'var(--todoist-red-light)' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--todoist-sidebar-hover)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white border-b" style={{ borderColor: 'var(--todoist-border)' }}>
        <div className="flex overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap transition-colors border-b-2',
                  isActive ? 'font-medium border-current' : 'border-transparent'
                )}
                style={{
                  color: isActive ? 'var(--todoist-red)' : 'var(--todoist-text-light)'
                }}
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