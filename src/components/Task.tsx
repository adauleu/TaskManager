import { NavLink } from 'react-router-dom'
import type { Task as TaskType } from '../types'

interface TaskProps {
  task: TaskType
  onMarkDone?: (task: TaskType) => void | Promise<void>
  onDelete?: (task: TaskType) => void | Promise<void>
}

export default function Task({ task, onMarkDone, onDelete }: TaskProps) {
  const isDone = task.status === 'done'
  const isInProgress = task.status === 'in_progress'
  const badgeText = isDone ? 'Terminée' : isInProgress ? 'En cours' : 'À faire'
  const badgeClasses = isDone
    ? 'bg-green-200 text-green-800'
    : isInProgress
      ? 'bg-blue-100 text-blue-800'
      : 'bg-yellow-100 text-yellow-800'

  return (
    <div className="border rounded p-4 mb-3 shadow flex justify-between items-center bg-white hover:bg-gray-50 transition">
      <div>
        <div className="flex items-center gap-3">
          <span className={`text-xs px-2 py-1 rounded-full ${badgeClasses}`}>{badgeText}</span>
          <NavLink
            className={`text-lg font-semibold ${isDone ? 'line-through text-gray-500' : ''}`}
            to={`/tasks/edit/${task.id}`}
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
            onClick={() => onMarkDone?.(task)}
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
          onClick={() => onDelete?.(task)}
        >
          Supprimer
        </button>
      </div>
    </div>
  )
}
