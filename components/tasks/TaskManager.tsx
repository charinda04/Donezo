'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTaskStore } from '@/lib/stores/useTaskStore'
import { useUIStore } from '@/lib/stores/useUIStore'
import { TaskForm } from '@/components/tasks/TaskForm'
import { TaskList } from '@/components/tasks/TaskList'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { createTask, updateTask, toggleTaskComplete, deleteTask, getTasks } from '@/lib/actions/tasks'
import { Task } from '@prisma/client'

interface TaskManagerProps {
  filter?: 'all' | 'today' | 'completed'
}

export function TaskManager({ filter = 'all' }: TaskManagerProps) {
  const queryClient = useQueryClient()
  
  // Zustand stores
  const { tasks, setTasks, addTask, updateTask: updateTaskInStore, removeTask, filteredTasks } = useTaskStore()
  const { 
    isDeleteModalOpen, 
    deleteModalTaskId, 
    closeDeleteModal, 
    openDeleteModal, 
    showToast
  } = useUIStore()

  // Fetch tasks query
  const { isLoading } = useQuery({
    queryKey: ['tasks', filter],
    queryFn: async () => {
      const result = await getTasks(filter)
      if (result.success && result.tasks) {
        setTasks(result.tasks)
        return result.tasks
      }
      throw new Error(result.error || 'Failed to fetch tasks')
    },
  })

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: async ({ content, dueDate }: { content: string; dueDate?: Date }) => {
      const result = await createTask(content, dueDate)
      if (!result.success) {
        throw new Error(result.error || 'Failed to create task')
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
      addTask(tempTask)
    },
    onSuccess: () => {
      // Replace temp task with real task
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      showToast('Task created successfully!', 'success')
    },
    onError: (error) => {
      showToast(error.message, 'error')
      // Refresh to remove optimistic update
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: async ({ taskId, content }: { taskId: string; content: string }) => {
      const result = await updateTask(taskId, content)
      if (!result.success) {
        throw new Error(result.error || 'Failed to update task')
      }
      return result.task
    },
    onMutate: async ({ taskId, content }) => {
      // Optimistic update
      updateTaskInStore(taskId, { content })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      showToast('Task updated successfully!', 'success')
    },
    onError: (error) => {
      showToast(error.message, 'error')
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  // Toggle complete mutation
  const toggleCompleteMutation = useMutation({
    mutationFn: async (taskId: string) => {
      const result = await toggleTaskComplete(taskId)
      if (!result.success) {
        throw new Error(result.error || 'Failed to toggle task completion')
      }
      return result.task
    },
    onMutate: async (taskId) => {
      // Optimistic update
      const task = tasks.find(t => t.id === taskId)
      if (task) {
        updateTaskInStore(taskId, { 
          completed: !task.completed,
          completedAt: !task.completed ? new Date() : null
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: (error) => {
      showToast(error.message, 'error')
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      const result = await deleteTask(taskId)
      if (!result.success) {
        throw new Error(result.error || 'Failed to delete task')
      }
    },
    onMutate: async (taskId) => {
      // Optimistic update
      removeTask(taskId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      showToast('Task deleted successfully!', 'success')
      closeDeleteModal()
    },
    onError: (error) => {
      showToast(error.message, 'error')
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  // Event handlers
  const handleCreateTask = (content: string, dueDate?: Date) => {
    createTaskMutation.mutate({ content, dueDate })
  }

  const handleUpdateTask = (taskId: string, content: string) => {
    updateTaskMutation.mutate({ taskId, content })
  }

  const handleToggleComplete = (taskId: string) => {
    toggleCompleteMutation.mutate(taskId)
  }

  const handleDeleteClick = (taskId: string) => {
    openDeleteModal(taskId)
  }

  const handleConfirmDelete = () => {
    if (deleteModalTaskId) {
      deleteTaskMutation.mutate(deleteModalTaskId)
    }
  }

  const taskToDelete = tasks.find(t => t.id === deleteModalTaskId)

  return (
    <div className="space-y-6">
      <TaskForm 
        onSubmit={handleCreateTask} 
        loading={createTaskMutation.isPending}
      />
      
      <TaskList
        tasks={filteredTasks()}
        loading={isLoading}
        onToggleComplete={handleToggleComplete}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteClick}
        emptyMessage={
          filter === 'today' ? "No tasks due today" :
          filter === 'completed' ? "No completed tasks yet" :
          "No tasks yet. Create your first task above!"
        }
      />

      {/* Delete confirmation modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete Task"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete &quot;{taskToDelete?.content}&quot;? This action cannot be undone.
          </p>
          
          <div className="flex gap-2 justify-end">
            <Button
              variant="secondary"
              onClick={closeDeleteModal}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmDelete}
              loading={deleteTaskMutation.isPending}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}