'use client'

import { useState, useCallback, useMemo, memo } from 'react'
import { Task } from '@prisma/client'
import { Trash2, Edit } from 'lucide-react'
import { clsx } from 'clsx'

interface TaskItemProps {
  task: Task
  onToggleComplete: (taskId: string) => void
  onUpdate: (taskId: string, content: string) => void
  onDelete: (taskId: string) => void
}

function TaskItemComponent({ task, onToggleComplete, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(task.content)

  const handleSave = useCallback(() => {
    if (editContent.trim() && editContent !== task.content) {
      onUpdate(task.id, editContent.trim())
    }
    setIsEditing(false)
  }, [editContent, task.content, task.id, onUpdate])

  const handleCancel = useCallback(() => {
    setEditContent(task.content)
    setIsEditing(false)
  }, [task.content])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }, [handleSave, handleCancel])

  const handleToggleClick = useCallback(() => {
    onToggleComplete(task.id)
  }, [onToggleComplete, task.id])

  const handleEditClick = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleDeleteClick = useCallback(() => {
    onDelete(task.id)
  }, [onDelete, task.id])

  const { isOverdue, isToday } = useMemo(() => {
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
    const isToday = task.dueDate && new Date(task.dueDate).toDateString() === new Date().toDateString()
    return { isOverdue, isToday }
  }, [task.dueDate, task.completed])

  return (
    <div 
      className={clsx(
        'group flex items-start gap-4 py-4 px-5 transition-colors',
        task.completed && 'opacity-60'
      )}
      style={{ 
        backgroundColor: 'var(--todoist-background)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--todoist-task-hover)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--todoist-background)'
      }}
    >
      {/* Custom Checkbox */}
      <button
        onClick={handleToggleClick}
        className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
        style={{
          borderColor: task.completed ? 'var(--todoist-completed)' : 'var(--todoist-border)',
          backgroundColor: task.completed ? 'var(--todoist-completed)' : 'transparent'
        }}
      >
        {task.completed && (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>
      
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full px-0 py-0 text-sm border-none outline-none bg-transparent"
            style={{ color: 'var(--todoist-text)' }}
            autoFocus
          />
        ) : (
          <div
            className={clsx(
              'cursor-text text-base leading-relaxed',
              task.completed && 'line-through'
            )}
            style={{ 
              color: task.completed ? 'var(--todoist-completed)' : 'var(--todoist-text)' 
            }}
            onClick={handleEditClick}
          >
            {task.content}
          </div>
        )}
        
        {task.dueDate && (
          <div className="flex items-center gap-1 mt-1">
            <span 
              className="text-xs font-medium px-2 py-0.5 rounded"
              style={{
                color: isOverdue ? 'var(--overdue)' : isToday ? 'var(--today)' : 'var(--todoist-text-muted)',
                backgroundColor: isOverdue ? '#fef2f2' : isToday ? '#fef2f2' : '#f9f9f9'
              }}
            >
              {new Date(task.dueDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleEditClick}
          className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
        >
          <Edit className="h-3.5 w-3.5" style={{ color: 'var(--todoist-text-muted)' }} />
        </button>
        
        <button
          onClick={handleDeleteClick}
          className="p-1.5 rounded-md hover:bg-red-50 transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" style={{ color: 'var(--todoist-text-muted)' }} />
        </button>
      </div>
    </div>
  )
}

export const TaskItem = memo(TaskItemComponent)