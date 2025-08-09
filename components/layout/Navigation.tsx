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
        className="hidden lg:block w-80 border-r flex-shrink-0" 
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

      {/* Tablet Navigation */}
      <nav 
        className="hidden md:block lg:hidden w-20 border-r flex-shrink-0" 
        style={{ 
          backgroundColor: 'var(--todoist-sidebar)', 
          borderColor: 'var(--todoist-border)' 
        }}
      >
        <div className="p-4">
          <div className="space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'flex items-center justify-center w-12 h-12 rounded-lg transition-colors',
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
                  title={item.label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white border-t fixed bottom-0 left-0 right-0 z-50" style={{ borderColor: 'var(--todoist-border)' }}>
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex flex-col items-center gap-1 py-3 px-4 text-xs transition-colors min-h-[60px] flex-1 justify-center',
                  isActive ? 'font-medium' : ''
                )}
                style={{
                  color: isActive ? 'var(--todoist-red)' : 'var(--todoist-text-light)',
                  backgroundColor: isActive ? 'var(--todoist-red-light)' : 'transparent'
                }}
              >
                <Icon className="h-5 w-5" />
                <span className="leading-tight">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}