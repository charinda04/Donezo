'use client'

import { ReactNode } from 'react'
import { Header } from './Header'
import { Navigation } from './Navigation'
import { Toast } from '../ui/Toast'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--todoist-background)' }}>
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Navigation />
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-5xl">
            {children}
          </div>
        </main>
      </div>
      
      <Toast />
    </div>
  )
}