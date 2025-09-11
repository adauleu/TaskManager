import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createTask } from './api'
import { toast } from 'sonner'

export default function CreateTask() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await createTask({
        title,
        description,
        status: 'todo',
      })
      toast.success(`Tâche "${title}" créée avec succès.`)
      setTitle('')
      setDescription('')
      navigate('/tasks')
    } catch (err) {
      console.error(err)
      setError('Une erreur est survenue lors de la création de la tâche.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Créer une tâche</h2>
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
            placeholder="Saisissez le titre de la tâche"
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
            placeholder="Détaillez la tâche à réaliser"
            required
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 disabled:opacity-60 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {submitting ? 'Création…' : 'Créer'}
          </button>
        </div>
      </form>
    </div>
  )
}
