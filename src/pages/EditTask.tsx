import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTask, updateTask } from '../services/api'
import type { Task } from '../types'
import { toast } from 'sonner'

export default function EditTask() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<Task['status']>('todo')

  useEffect(() => {
    const fetch = async () => {
      if (!id) return
      try {
        const task = await getTask(id)
        setTitle(task.title)
        setDescription(task.description)
        setStatus(task.status)
      } catch (err) {
        console.error(err)
        setError('Impossible de charger la tâche.')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!id) return
    setError(null)
    setSubmitting(true)
    try {
      await updateTask(id, { title, description, status })
      toast.success(`Tâche "${title}" mise à jour.`)
      navigate('/tasks')
    } catch (err) {
      console.error(err)
      setError('Une erreur est survenue lors de la mise à jour.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div>Chargement…</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Modifier la tâche</h2>
      <form onSubmit={onSubmit} className="space-y-4 bg-white p-4 border rounded shadow">
        {error && (
          <div className="text-red-600 text-sm" role="alert">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Titre
          </label>
          <input
            id="title"
            type="text"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            className="w-full border rounded px-3 py-2 h-32 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Statut
          </label>
          <select
            id="status"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={status}
            onChange={(e) => setStatus(e.target.value as Task['status'])}
          >
            <option value="todo">À faire</option>
            <option value="in_progress">En cours</option>
            <option value="done">Terminée</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 disabled:opacity-60 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {submitting ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  )
}
