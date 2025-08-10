import { TaskFilter } from './tasks'

export const QUERY_KEYS = {
  TASKS: 'tasks',
  TASK: 'task',
  USER: 'user',
} as const

export const taskKeys = {
  all: () => [QUERY_KEYS.TASKS] as const,
  lists: () => [...taskKeys.all(), 'list'] as const,
  list: (filter: TaskFilter) => [...taskKeys.lists(), filter] as const,
  details: () => [...taskKeys.all(), 'detail'] as const,
  detail: (id: string) => [...taskKeys.details(), id] as const,
}

export type TaskKeys = ReturnType<(typeof taskKeys)[keyof typeof taskKeys]>