import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getTasks, deleteTask, updateTask } from '../services/api'
import type { Task } from '../types'
import { toast } from 'sonner'

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
      {tasks.map((task) => {
        const isDone = task.status === 'done'
        const isInProgress = task.status === 'in_progress'
        const badgeText = isDone ? 'Terminée' : isInProgress ? 'En cours' : 'À faire'
        const badgeClasses = isDone
          ? 'bg-green-200 text-green-800'
          : isInProgress
            ? 'bg-blue-100 text-blue-800'
            : 'bg-yellow-100 text-yellow-800'
        return (
          <div
            key={task.id}
            className="border rounded p-4 mb-3 shadow flex justify-between items-center bg-white hover:bg-gray-50 transition"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 rounded-full ${badgeClasses}`}>
                  {badgeText}
                </span>
                <NavLink
                  className={`text-lg font-semibold ${isDone ? 'line-through text-gray-500' : ''}`}
                  to={`/tasks/${task.id}`}
                >
                  {task.title}
                </NavLink>
              </div>
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            </div>
            <div className="flex gap-2">
              {!isDone && (
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => {
                    markAsDone(task)
                  }}
                >
                  Terminer
                </button>
              )}
              <NavLink
                className="bg-yellow-500 text-white px-3 py-1 rounded"
                to={`/tasks/edit/${task.id}`}
              >
                Modifier
              </NavLink>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={async () => {
                  try {
                    await deleteTask(task.id)
                    fetchTasks()
                  } catch (e) {
                    console.error(e)
                  }
                }}
              >
                Supprimer
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
