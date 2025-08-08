'use client'

import { Task } from '@prisma/client'
import { TaskItem } from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  loading?: boolean
  onToggleComplete: (taskId: string) => void
  onUpdate: (taskId: string, content: string) => void
  onDelete: (taskId: string) => void
  emptyMessage?: string
}

export function TaskList({ 
  tasks, 
  loading, 
  onToggleComplete, 
  onUpdate, 
  onDelete,
  emptyMessage = "No tasks found"
}: TaskListProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg animate-pulse"
          >
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">{emptyMessage}</div>
        <div className="text-gray-400 text-sm mt-2">
          Create your first task to get started!
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}