'use client'

import { ReactNode, useEffect } from 'react'
import { clsx } from 'clsx'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Modal({ isOpen, onClose, children, title, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={clsx(
          'bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-h-[90vh] overflow-y-auto',
          {
            'sm:max-w-sm': size === 'sm',
            'sm:max-w-md': size === 'md',
            'sm:max-w-lg': size === 'lg',
          }
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          </div>
        )}
        <div className="px-4 sm:px-6 py-4 pb-6 sm:pb-4">
          {children}
        </div>
      </div>
    </div>
  )
}