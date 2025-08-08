'use client'

import { useState } from 'react'
import { Task } from '@prisma/client'
import { Checkbox } from '../ui/Checkbox'
import { Button } from '../ui/Button'
import { Trash2, Edit } from 'lucide-react'
import { clsx } from 'clsx'

interface TaskItemProps {
  task: Task
  onToggleComplete: (taskId: string) => void
  onUpdate: (taskId: string, content: string) => void
  onDelete: (taskId: string) => void
}

export function TaskItem({ task, onToggleComplete, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(task.content)

  const handleSave = () => {
    if (editContent.trim() && editContent !== task.content) {
      onUpdate(task.id, editContent.trim())
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditContent(task.content)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div className={clsx(
      'group flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors',
      task.completed && 'opacity-60'
    )}>
      <Checkbox
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        className="flex-shrink-0"
      />
      
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <div
            className={clsx(
              'cursor-text hover:bg-gray-100 px-2 py-1 rounded',
              task.completed && 'line-through text-gray-500'
            )}
            onClick={() => setIsEditing(true)}
          >
            {task.content}
          </div>
        )}
        
        {task.dueDate && (
          <div className={clsx(
            'text-xs mt-1 px-2',
            new Date(task.dueDate) < new Date() && !task.completed 
              ? 'text-red-600' 
              : 'text-gray-500'
          )}>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(true)}
          className="h-8 w-8 p-0"
        >
          <Edit className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task.id)}
          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}