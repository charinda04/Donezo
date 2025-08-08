import { TaskManager } from '../../../../components/tasks/TaskManager'

export default function TodayPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--todoist-text)' }}>
          Today
        </h1>
        <p className="text-sm" style={{ color: 'var(--todoist-text-muted)' }}>
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      
      <TaskManager filter="today" />
    </div>
  )
}