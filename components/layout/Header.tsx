'use client'

import { useSession, signOut } from 'next-auth/react'
import { LogOut, User } from 'lucide-react'

export function Header() {
  const { data: session } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' })
  }

  return (
    <header className="bg-white border-b" style={{ borderColor: 'var(--todoist-border)' }}>
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold" style={{ color: 'var(--todoist-red)' }}>
            Donezo
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          {session?.user && (
            <>
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--todoist-text-light)' }}>
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{session.user.name || session.user.email}</span>
              </div>
              
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors hover:bg-gray-50"
                style={{ color: 'var(--todoist-text-light)' }}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}