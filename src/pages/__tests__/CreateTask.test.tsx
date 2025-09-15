import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import CreateTask from '../CreateTask'

// Mock de l'API
vi.mock('../../services/api', () => ({
  createTask: vi.fn(),
}))

// Accès pratique au mock
const { createTask } = (await import('../../services/api')) as unknown as {
  createTask: ReturnType<typeof vi.fn>
}

describe('CreateTask', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  function renderWithRouter(initialPath = '/create') {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/create" element={<CreateTask />} />
          <Route path="/tasks" element={<div>Tasks Page</div>} />
        </Routes>
      </MemoryRouter>,
    )
  }

  it('affiche les champs et le bouton', () => {
    renderWithRouter()
    expect(screen.getByRole('heading', { name: /créer une tâche/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/titre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /créer/i })).toBeInTheDocument()
  })

  it('crée une tâche et redirige vers /tasks', async () => {
    ;(createTask as any).mockResolvedValueOnce({
      id: 1,
      title: 'T1',
      description: 'D1',
      status: 'todo',
    })

    renderWithRouter()

    fireEvent.change(screen.getByLabelText(/titre/i), { target: { value: 'T1' } })
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'D1' } })
    fireEvent.click(screen.getByRole('button', { name: /créer/i }))

    await waitFor(() => {
      expect(screen.getByText('Tasks Page')).toBeInTheDocument()
    })

    expect(createTask).toHaveBeenCalledWith({
      title: 'T1',
      description: 'D1',
      status: 'todo',
    })
  })

  it("affiche une erreur si l'API échoue", async () => {
    ;(createTask as any).mockRejectedValueOnce(new Error('Network error'))

    renderWithRouter()

    fireEvent.change(screen.getByLabelText(/titre/i), { target: { value: 'Oops' } })
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Err' } })
    fireEvent.click(screen.getByRole('button', { name: /Créer/i }))

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent('Une erreur est survenue lors de la création de la tâche.')
  })
})
