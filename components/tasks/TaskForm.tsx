'use client'

import { useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Plus } from 'lucide-react'

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="What needs to be done?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="text-base"
          />
        </div>
        <div className="flex gap-3">
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-auto min-w-0 flex-1 sm:flex-none"
          />
          <Button type="submit" loading={loading} disabled={!content.trim()}>
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Add Task</span>
          </Button>
        </div>
      </div>
    </form>
  )
}