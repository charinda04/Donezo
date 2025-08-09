'use client'

import { ReactNode, memo, useCallback } from 'react'
import { Modal } from './Modal'
import { Button } from './Button'
import { UI_TEXT } from '@/lib/constants/ui'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string | ReactNode
  confirmText?: string
  cancelText?: string
  confirmVariant?: 'primary' | 'secondary' | 'danger'
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
}

function ConfirmDialogComponent({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = UI_TEXT.CONFIRM,
  cancelText = UI_TEXT.CANCEL,
  confirmVariant = 'danger',
  loading = false,
  size = 'sm'
}: ConfirmDialogProps) {
  const handleConfirm = useCallback(() => {
    onConfirm()
  }, [onConfirm])

  const handleCancel = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
    >
      <div className="space-y-4">
        <div className="text-gray-600">
          {typeof message === 'string' ? <p>{message}</p> : message}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
          <Button
            variant="secondary"
            onClick={handleCancel}
            disabled={loading}
            className="w-full sm:w-auto min-h-[44px] touch-manipulation"
          >
            {cancelText}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={handleConfirm}
            loading={loading}
            className="w-full sm:w-auto min-h-[44px] touch-manipulation"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export const ConfirmDialog = memo(ConfirmDialogComponent)