'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'
import { makeQueryClient } from './query-client'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  // We can also use getQueryClient() if we want to reuse the query client
  const [queryClient] = useState(() => makeQueryClient())

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools 
          initialIsOpen={false} 
          position="bottom-right"
        />
      </QueryClientProvider>
    </SessionProvider>
  )
}