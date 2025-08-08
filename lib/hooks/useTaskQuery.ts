import { useQuery } from '@tanstack/react-query'
import { getTasks } from '@/lib/actions/tasks'
import { taskKeys } from '@/lib/constants/queryKeys'
import { TaskFilter } from '@/lib/constants/tasks'

export function useTaskQuery(filter: TaskFilter = 'all') {
  return useQuery({
    queryKey: taskKeys.list(filter),
    queryFn: async () => {
      const result = await getTasks(filter)
      if (result.success && result.tasks) {
        return result.tasks
      }
      throw new Error(result.error || 'Failed to fetch tasks')
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  })
}