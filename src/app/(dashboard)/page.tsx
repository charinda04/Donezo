import { TaskManager } from '../../../components/tasks/TaskManager'

export default function Home() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--todoist-text)' }}>
          Inbox
        </h1>
      </div>
      
      <TaskManager filter="all" />
    </div>
  )
}
