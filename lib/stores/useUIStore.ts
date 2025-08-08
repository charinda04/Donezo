import { create } from 'zustand'

interface UIStore {
  // Loading states
  isLoading: boolean
  isSubmitting: boolean
  
  // Modal states
  isDeleteModalOpen: boolean
  deleteModalTaskId: string | null
  
  // Toast/notification state
  toast: {
    message: string
    type: 'success' | 'error' | 'info'
  } | null
  
  // Mobile sidebar state
  isSidebarOpen: boolean
  
  // Actions
  setLoading: (loading: boolean) => void
  setSubmitting: (submitting: boolean) => void
  openDeleteModal: (taskId: string) => void
  closeDeleteModal: () => void
  showToast: (message: string, type: 'success' | 'error' | 'info') => void
  hideToast: () => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  // Initial state
  isLoading: false,
  isSubmitting: false,
  isDeleteModalOpen: false,
  deleteModalTaskId: null,
  toast: null,
  isSidebarOpen: false,
  
  // Actions
  setLoading: (loading) => set({ isLoading: loading }),
  
  setSubmitting: (submitting) => set({ isSubmitting: submitting }),
  
  openDeleteModal: (taskId) =>
    set({
      isDeleteModalOpen: true,
      deleteModalTaskId: taskId,
    }),
  
  closeDeleteModal: () =>
    set({
      isDeleteModalOpen: false,
      deleteModalTaskId: null,
    }),
  
  showToast: (message, type) =>
    set({
      toast: { message, type },
    }),
  
  hideToast: () => set({ toast: null }),
  
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  
  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),
}))