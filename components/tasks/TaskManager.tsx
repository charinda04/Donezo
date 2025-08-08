'use client'

import { TaskForm } from '@/components/tasks/TaskForm'
import { TaskList } from '@/components/tasks/TaskList'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useTaskQuery } from '@/lib/hooks/useTaskQuery'
import { useTaskMutations } from '@/lib/hooks/useTaskMutations'
import { useDeleteModal } from '@/lib/hooks/useDeleteModal'
import { useTaskStore } from '@/lib/stores/useTaskStore'
import { TaskFilter, EMPTY_MESSAGES } from '@/lib/constants/tasks'
import { UI_TEXT } from '@/lib/constants/ui'

interface TaskManagerProps {
  filter?: TaskFilter
}

export function TaskManager({ filter = 'all' }: TaskManagerProps) {
  // Custom hooks
  const { data: tasks = [], isLoading } = useTaskQuery(filter)
  const mutations = useTaskMutations()
  const deleteModal = useDeleteModal(tasks)
  const { getFilteredTasks } = useTaskStore()
  
  const filteredTasks = getFilteredTasks(tasks)

  // Event handlers
  const handleCreateTask = (content: string, dueDate?: Date) => {
    mutations.createTask.mutate({ content, dueDate })
  }

  const handleUpdateTask = (taskId: string, content: string) => {
    mutations.updateTask.mutate({ taskId, content })
  }

  const handleToggleComplete = (taskId: string) => {
    mutations.toggleComplete.mutate(taskId)
  }

  const handleConfirmDelete = () => {
    if (deleteModal.deleteModalTaskId) {
      mutations.deleteTask.mutate(deleteModal.deleteModalTaskId)
    }
  }

  const getEmptyMessage = () => {
    switch (filter) {
      case 'today': return EMPTY_MESSAGES.TODAY
      case 'completed': return EMPTY_MESSAGES.COMPLETED
      default: return EMPTY_MESSAGES.ALL
    }
  }

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
        emptyMessage={getEmptyMessage()}
      />

      {/* Delete confirmation modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.handleCloseModal}
        title={UI_TEXT.DELETE}
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete &quot;{deleteModal.taskToDelete?.content}&quot;? This action cannot be undone.
          </p>
          
          <div className="flex gap-2 justify-end">
            <Button
              variant="secondary"
              onClick={deleteModal.handleCloseModal}
            >
              {UI_TEXT.CANCEL}
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmDelete}
              loading={mutations.deleteTask.isPending}
            >
              {UI_TEXT.DELETE}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}