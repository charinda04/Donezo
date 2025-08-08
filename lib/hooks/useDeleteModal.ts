import { useUIStore } from '@/lib/stores/useUIStore'
import { useTaskStore } from '@/lib/stores/useTaskStore'

export function useDeleteModal() {
  const { 
    isDeleteModalOpen, 
    deleteModalTaskId, 
    closeDeleteModal, 
    openDeleteModal 
  } = useUIStore()
  
  const { tasks } = useTaskStore()

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