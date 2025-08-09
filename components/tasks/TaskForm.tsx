'use client'

import { useState } from 'react'

interface TaskFormProps {
  onSubmit: (content: string, dueDate?: Date) => void
  loading?: boolean
}

export function TaskForm({ onSubmit, loading }: TaskFormProps) {
  const [content, setContent] = useState('')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim()) return

    const dueDateObj = dueDate ? new Date(dueDate) : undefined
    onSubmit(content.trim(), dueDateObj)
    
    setContent('')
    setDueDate('')
  }

  return (
    <div className="mb-4 sm:mb-6">
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg border p-4 sm:p-5" style={{ borderColor: 'var(--todoist-border)' }}>
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="What needs to be done?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-0 py-3 text-base border-none outline-none bg-transparent placeholder:text-gray-400 touch-manipulation"
                style={{
                  color: 'var(--todoist-text)'
                }}
                autoComplete="off"
                autoCapitalize="sentences"
                autoCorrect="on"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-3 py-2 sm:px-2 sm:py-1 text-sm sm:text-xs border rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors min-h-[44px] sm:min-h-0 touch-manipulation"
                style={{
                  borderColor: 'var(--todoist-border)',
                  color: 'var(--todoist-text)'
                }}
              />
              <button
                type="submit"
                disabled={!content.trim() || loading}
                className="px-4 py-2 sm:px-3 sm:py-1.5 text-sm sm:text-xs font-medium rounded transition-colors disabled:opacity-50 flex items-center justify-center gap-1 min-h-[44px] sm:min-h-0 touch-manipulation"
                style={{
                  backgroundColor: 'var(--todoist-red)',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.backgroundColor = 'var(--todoist-red-hover)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.backgroundColor = 'var(--todoist-red)'
                  }
                }}
              >
                {loading ? 'Adding...' : 'Add Task'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}