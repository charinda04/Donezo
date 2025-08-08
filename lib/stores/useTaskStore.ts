import { create } from 'zustand'
import { Task } from '@prisma/client'
import { TaskFilter } from '@/lib/constants/tasks'

interface TaskStore {
  // State - only temporary/optimistic update state
  optimisticTasks: Task[]
  selectedTaskId: string | null
  filter: TaskFilter
  searchQuery: string
  
  // Actions
  setOptimisticTasks: (tasks: Task[]) => void
  addOptimisticTask: (task: Task) => void
  updateOptimisticTask: (taskId: string, updates: Partial<Task>) => void
  removeOptimisticTask: (taskId: string) => void
  clearOptimisticTasks: () => void
  setSelectedTaskId: (taskId: string | null) => void
  setFilter: (filter: TaskFilter) => void
  setSearchQuery: (query: string) => void
  
  // Computed - now takes tasks as parameter from TanStack Query
  getFilteredTasks: (tasks: Task[]) => Task[]
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  // Initial state - only optimistic/UI state
  optimisticTasks: [],
  selectedTaskId: null,
  filter: 'all',
  searchQuery: '',
  
  // Actions
  setOptimisticTasks: (tasks) => set({ optimisticTasks: tasks }),
  
  addOptimisticTask: (task) =>
    set((state) => ({
      optimisticTasks: [task, ...state.optimisticTasks],
    })),
  
  updateOptimisticTask: (taskId, updates) =>
    set((state) => ({
      optimisticTasks: state.optimisticTasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      ),
    })),
  
  removeOptimisticTask: (taskId) =>
    set((state) => ({
      optimisticTasks: state.optimisticTasks.filter((task) => task.id !== taskId),
      selectedTaskId: state.selectedTaskId === taskId ? null : state.selectedTaskId,
    })),

  clearOptimisticTasks: () => set({ optimisticTasks: [] }),
  
  setSelectedTaskId: (taskId) => set({ selectedTaskId: taskId }),
  
  setFilter: (filter) => set({ filter }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  // Computed - now works with tasks from TanStack Query
  getFilteredTasks: (tasks: Task[]) => {
    const { filter, searchQuery } = get()
    
    let filtered = tasks
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((task) =>
        task.content.toLowerCase().includes(query)
      )
    }
    
    // Apply status filter
    switch (filter) {
      case 'today':
        const today = new Date()
        today.setHours(23, 59, 59, 999)
        filtered = filtered.filter(
          (task) => !task.completed && task.dueDate && new Date(task.dueDate) <= today
        )
        break
      case 'completed':
        filtered = filtered.filter((task) => task.completed)
        break
      case 'all':
      default:
        // No additional filtering
        break
    }
    
    return filtered
  },
}))