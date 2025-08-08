export const TASK_FILTERS = {
  ALL: 'all',
  TODAY: 'today',
  COMPLETED: 'completed',
} as const

export type TaskFilter = typeof TASK_FILTERS[keyof typeof TASK_FILTERS]

export const TASK_PRIORITY = {
  NONE: 'NONE',
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
} as const

export type TaskPriority = typeof TASK_PRIORITY[keyof typeof TASK_PRIORITY]

export const TASK_MESSAGES = {
  CREATE_SUCCESS: 'Task created successfully!',
  UPDATE_SUCCESS: 'Task updated successfully!',
  DELETE_SUCCESS: 'Task deleted successfully!',
  CREATE_ERROR: 'Failed to create task',
  UPDATE_ERROR: 'Failed to update task',
  DELETE_ERROR: 'Failed to delete task',
  TOGGLE_ERROR: 'Failed to toggle task completion',
  CONTENT_REQUIRED: 'Task content is required',
} as const

export const EMPTY_MESSAGES = {
  ALL: 'No tasks yet. Create your first task above!',
  TODAY: 'No tasks due today',
  COMPLETED: 'No completed tasks yet',
} as const