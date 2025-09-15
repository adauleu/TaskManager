import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getTasks, deleteTask, updateTask } from '../services/api'
import type { Task } from '../types'
import { toast } from 'sonner'
import TaskItem from '../components/Task'

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const fetchTasks = async () => {
    const tasksResult = await getTasks()
    setTasks(tasksResult)
  }
  useEffect(() => {
    fetchTasks()
  }, [])

  async function markAsDone(task: Task) {
    await updateTask(task.id, { status: 'done' })
    toast.success(`Tâche "${task.title}" marquée comme terminée.`)
    fetchTasks()
  }

  return (
    <div>
      <h2>Mes Tâches</h2>
      <NavLink className="inline-block mb-4 text-blue-600 underline" to="/tasks/create">
        + Nouvelle tâche
      </NavLink>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onMarkDone={async (t) => {
            await markAsDone(t)
          }}
          onDelete={async (t) => {
            try {
              await deleteTask(t.id)
              fetchTasks()
            } catch (e) {
              console.error(e)
            }
          }}
        />
      ))}
    </div>
  )
}
