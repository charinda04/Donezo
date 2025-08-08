import { TaskManager } from '../../../../components/tasks/TaskManager'

export default function TodayPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Today</h1>
        <p className="text-gray-600">Tasks due today or overdue</p>
      </div>
      
      <TaskManager filter="today" />
    </div>
  )
}