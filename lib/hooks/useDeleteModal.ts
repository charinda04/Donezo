import { useUIStore } from '@/lib/stores/useUIStore'
import { Task } from '@prisma/client'

export function useDeleteModal(tasks: Task[] = []) {
  const { 
    isDeleteModalOpen, 
    deleteModalTaskId, 
    closeDeleteModal, 
    openDeleteModal 
  } = useUIStore()

  const taskToDelete = tasks.find(t => t.id === deleteModalTaskId)

  const handleDeleteClick = (taskId: string) => {
    openDeleteModal(taskId)
  }

  const handleCloseModal = () => {
    closeDeleteModal()
  }

  return {
    isOpen: isDeleteModalOpen,
    taskToDelete,
    handleDeleteClick,
    handleCloseModal,
    deleteModalTaskId,
  }
}