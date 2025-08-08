import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Task } from '@prisma/client'
import { createTask, updateTask, toggleTaskComplete, deleteTask } from '@/lib/actions/tasks'
import { useTaskStore } from '@/lib/stores/useTaskStore'
import { useUIStore } from '@/lib/stores/useUIStore'
import { taskKeys } from '@/lib/constants/queryKeys'
import { TASK_MESSAGES } from '@/lib/constants/tasks'

export function useTaskMutations() {
  const queryClient = useQueryClient()
  const { addOptimisticTask, updateOptimisticTask, removeOptimisticTask, optimisticTasks } = useTaskStore()
  const { showToast, closeDeleteModal } = useUIStore()

  const createTaskMutation = useMutation({
    mutationFn: async ({ content, dueDate }: { content: string; dueDate?: Date }) => {
      const result = await createTask(content, dueDate)
      if (!result.success) {
        throw new Error(result.error || TASK_MESSAGES.CREATE_ERROR)
      }
      return result.task
    },
    onMutate: async ({ content, dueDate }) => {
      // Optimistic update
      const tempTask: Task = {
        id: `temp-${Date.now()}`,
        content,
        dueDate: dueDate || null,
        completed: false,
        completedAt: null,
        userId: 'temp',
        assigneeId: null,
        projectId: null,
        parentId: null,
        sectionId: null,
        priority: 'NONE',
        description: null,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      addOptimisticTask(tempTask)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
      showToast(TASK_MESSAGES.CREATE_SUCCESS, 'success')
    },
    onError: (error) => {
      showToast(error.message, 'error')
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
    },
  })

  const updateTaskMutation = useMutation({
    mutationFn: async ({ taskId, content }: { taskId: string; content: string }) => {
      const result = await updateTask(taskId, content)
      if (!result.success) {
        throw new Error(result.error || TASK_MESSAGES.UPDATE_ERROR)
      }
      return result.task
    },
    onMutate: async ({ taskId, content }) => {
      updateOptimisticTask(taskId, { content })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
      showToast(TASK_MESSAGES.UPDATE_SUCCESS, 'success')
    },
    onError: (error) => {
      showToast(error.message, 'error')
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
    },
  })

  const toggleCompleteMutation = useMutation({
    mutationFn: async (taskId: string) => {
      const result = await toggleTaskComplete(taskId)
      if (!result.success) {
        throw new Error(result.error || TASK_MESSAGES.TOGGLE_ERROR)
      }
      return result.task
    },
    onMutate: async (taskId) => {
      const task = optimisticTasks.find(t => t.id === taskId)
      if (task) {
        updateOptimisticTask(taskId, { 
          completed: !task.completed,
          completedAt: !task.completed ? new Date() : null
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
    },
    onError: (error) => {
      showToast(error.message, 'error')
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
    },
  })

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      const result = await deleteTask(taskId)
      if (!result.success) {
        throw new Error(result.error || TASK_MESSAGES.DELETE_ERROR)
      }
    },
    onMutate: async (taskId) => {
      removeOptimisticTask(taskId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
      showToast(TASK_MESSAGES.DELETE_SUCCESS, 'success')
      closeDeleteModal()
    },
    onError: (error) => {
      showToast(error.message, 'error')
      queryClient.invalidateQueries({ queryKey: taskKeys.all })
    },
  })

  return {
    createTask: createTaskMutation,
    updateTask: updateTaskMutation,
    toggleComplete: toggleCompleteMutation,
    deleteTask: deleteTaskMutation,
  }
}