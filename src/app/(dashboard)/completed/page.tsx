import { TaskManager } from '../../../../components/tasks/TaskManager'

export default function CompletedPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--todoist-text)' }}>
          Completed
        </h1>
      </div>
      
      <TaskManager filter="completed" />
    </div>
  )
}