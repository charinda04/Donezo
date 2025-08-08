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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      
      <div className="md:flex">        
        <main className="flex-1 p-4 sm:p-8">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      <Toast />
    </div>
  )
}