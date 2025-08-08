import { create } from 'zustand'
import { Task } from '@prisma/client'

interface TaskStore {
  // State
  tasks: Task[]
  selectedTaskId: string | null
  filter: 'all' | 'today' | 'completed'
  searchQuery: string
  
  // Actions
  setTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  updateTask: (taskId: string, updates: Partial<Task>) => void
  removeTask: (taskId: string) => void
  setSelectedTaskId: (taskId: string | null) => void
  setFilter: (filter: 'all' | 'today' | 'completed') => void
  setSearchQuery: (query: string) => void
  
  // Computed
  filteredTasks: () => Task[]
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  // Initial state
  tasks: [],
  selectedTaskId: null,
  filter: 'all',
  searchQuery: '',
  
  // Actions
  setTasks: (tasks) => set({ tasks }),
  
  addTask: (task) =>
    set((state) => ({
      tasks: [task, ...state.tasks],
    })),
  
  updateTask: (taskId, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      ),
    })),
  
  removeTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
      selectedTaskId: state.selectedTaskId === taskId ? null : state.selectedTaskId,
    })),
  
  setSelectedTaskId: (taskId) => set({ selectedTaskId: taskId }),
  
  setFilter: (filter) => set({ filter }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  // Computed
  filteredTasks: () => {
    const { tasks, filter, searchQuery } = get()
    
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