import { TaskManager } from '../../../components/tasks/TaskManager'

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Tasks</h1>
        <p className="text-gray-600">Manage all your tasks in one place</p>
      </div>
      
      <TaskManager filter="all" />
    </div>
  )
}
