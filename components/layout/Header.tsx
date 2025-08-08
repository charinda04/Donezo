'use client'

import { useSession, signOut } from 'next-auth/react'
import { Button } from '../ui/Button'
import { LogOut, User } from 'lucide-react'

export function Header() {
  const { data: session } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' })
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Donezo</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {session?.user && (
            <>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{session.user.name || session.user.email}</span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}