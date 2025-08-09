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
        <main className="flex-1 overflow-auto pb-20 md:pb-0">
          <div className="p-4 sm:p-6 lg:p-8 max-w-none sm:max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      <Toast />
    </div>
  )
}