'use client'

import { memo } from 'react'
import { Task } from '@prisma/client'
import { TaskItem } from './TaskItem'
import { clsx } from 'clsx'

interface TaskListProps {
  tasks: Task[]
  loading?: boolean
  onToggleComplete: (taskId: string) => void
  onUpdate: (taskId: string, content: string) => void
  onDelete: (taskId: string) => void
  emptyMessage?: string
}

function TaskListComponent({ 
  tasks, 
  loading, 
  onToggleComplete, 
  onUpdate, 
  onDelete,
  emptyMessage = "No tasks found"
}: TaskListProps) {
  if (loading) {
    return (
      <div className="space-y-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 py-2.5 px-0 animate-pulse border-b"
            style={{ borderColor: 'var(--todoist-border)' }}
          >
            <div className="h-5 w-5 rounded-full border-2" style={{ borderColor: 'var(--todoist-border)' }}></div>
            <div className="flex-1">
              <div className="h-4 rounded w-3/4" style={{ backgroundColor: 'var(--todoist-border)' }}></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-base font-medium mb-2" style={{ color: 'var(--todoist-text)' }}>
          {emptyMessage}
        </div>
        <div className="text-sm" style={{ color: 'var(--todoist-text-muted)' }}>
          Create your first task to get started!
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border" style={{ borderColor: 'var(--todoist-border)' }}>
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className={clsx(
            index !== tasks.length - 1 && 'border-b'
          )}
          style={{ borderColor: 'var(--todoist-border)' }}
        >
          <TaskItem
            task={task}
            onToggleComplete={onToggleComplete}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  )
}

export const TaskList = memo(TaskListComponent)