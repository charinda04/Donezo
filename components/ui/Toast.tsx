'use client'

import { useEffect } from 'react'
import { clsx } from 'clsx'
import { X, CheckCircle, XCircle, Info } from 'lucide-react'
import { useUIStore } from '../../lib/stores/useUIStore'

export function Toast() {
  const { toast, hideToast } = useUIStore()

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [toast, hideToast])

  if (!toast) return null

  const Icon = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  }[toast.type]

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div
        className={clsx(
          'flex items-center gap-3 p-4 rounded-lg shadow-lg border',
          {
            'bg-green-50 border-green-200 text-green-800': toast.type === 'success',
            'bg-red-50 border-red-200 text-red-800': toast.type === 'error',
            'bg-blue-50 border-blue-200 text-blue-800': toast.type === 'info',
          }
        )}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm font-medium">{toast.message}</p>
        <button
          onClick={hideToast}
          className="ml-auto flex-shrink-0 p-1 hover:bg-black/5 rounded"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}