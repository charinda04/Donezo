'use client'

import { useCallback, useMemo } from 'react'
import { TaskForm } from '@/components/tasks/TaskForm'
import { TaskList } from '@/components/tasks/TaskList'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { useTaskQuery } from '@/lib/hooks/useTaskQuery'
import { useTaskMutations } from '@/lib/hooks/useTaskMutations'
import { useDeleteModal } from '@/lib/hooks/useDeleteModal'
import { useTaskStore } from '@/lib/stores/useTaskStore'
import { TaskFilter, EMPTY_MESSAGES } from '@/lib/constants/tasks'
import { UI_TEXT, MODAL_TITLES } from '@/lib/constants/ui'

interface TaskManagerProps {
  filter?: TaskFilter
}

export function TaskManager({ filter = 'all' }: TaskManagerProps) {
  // Custom hooks
  const { data: tasks = [], isLoading } = useTaskQuery(filter)
  const mutations = useTaskMutations()
  const deleteModal = useDeleteModal(tasks)
  const { getFilteredTasks } = useTaskStore()
  
  const filteredTasks = useMemo(() => getFilteredTasks(tasks), [getFilteredTasks, tasks])

  // Event handlers
  const handleCreateTask = useCallback((content: string, dueDate?: Date) => {
    mutations.createTask.mutate({ content, dueDate })
  }, [mutations.createTask])

  const handleUpdateTask = useCallback((taskId: string, content: string) => {
    mutations.updateTask.mutate({ taskId, content })
  }, [mutations.updateTask])

  const handleToggleComplete = useCallback((taskId: string) => {
    mutations.toggleComplete.mutate(taskId)
  }, [mutations.toggleComplete])

  const handleConfirmDelete = useCallback(() => {
    if (deleteModal.deleteModalTaskId) {
      mutations.deleteTask.mutate(deleteModal.deleteModalTaskId)
    }
  }, [deleteModal.deleteModalTaskId, mutations.deleteTask])

  const emptyMessage = useMemo(() => {
    switch (filter) {
      case 'today': return EMPTY_MESSAGES.TODAY
      case 'completed': return EMPTY_MESSAGES.COMPLETED
      default: return EMPTY_MESSAGES.ALL
    }
  }, [filter])

  return (
    <div className="space-y-6">
      <TaskForm 
        onSubmit={handleCreateTask} 
        loading={mutations.createTask.isPending}
      />
      
      <TaskList
        tasks={filteredTasks}
        loading={isLoading}
        onToggleComplete={handleToggleComplete}
        onUpdate={handleUpdateTask}
        onDelete={deleteModal.handleDeleteClick}
        emptyMessage={emptyMessage}
      />

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.handleCloseModal}
        onConfirm={handleConfirmDelete}
        title={MODAL_TITLES.DELETE_TASK}
        message={`Are you sure you want to delete "${deleteModal.taskToDelete?.content}"? This action cannot be undone.`}
        confirmText={UI_TEXT.DELETE}
        loading={mutations.deleteTask.isPending}
      />
    </div>
  )
}