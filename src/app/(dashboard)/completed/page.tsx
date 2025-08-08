import { TaskManager } from '../../../../components/tasks/TaskManager'

export default function CompletedPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Completed</h1>
        <p className="text-gray-600">Tasks you&apos;ve completed</p>
      </div>
      
      <TaskManager filter="completed" />
    </div>
  )
}