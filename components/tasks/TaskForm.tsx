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
    <div className="mb-6">
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg border p-5" style={{ borderColor: 'var(--todoist-border)' }}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="What needs to be done?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-0 py-3 text-base border-none outline-none bg-transparent placeholder:text-gray-400"
                style={{
                  color: 'var(--todoist-text)'
                }}
              />
            </div>
            <div className="flex gap-4 items-center">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-2 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors"
                style={{
                  borderColor: 'var(--todoist-border)',
                  color: 'var(--todoist-text)'
                }}
              />
              <button
                type="submit"
                disabled={!content.trim() || loading}
                className="px-3 py-1.5 text-xs font-medium rounded transition-colors disabled:opacity-50 flex items-center gap-1"
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
                Add Task
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}