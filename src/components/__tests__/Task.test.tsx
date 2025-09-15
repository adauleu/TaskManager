import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Task from '../Task'
import type { Task as TaskType } from '../../types'
import { MemoryRouter } from 'react-router-dom'

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

const baseTask: TaskType = {
  id: 1,
  title: 'Ma tâche',
  description: 'Description',
  status: 'todo',
}

describe('Task component', () => {
  it("affiche le titre, la description et le badge 'À faire'", () => {
    renderWithRouter(<Task task={baseTask} />)
    expect(screen.getByText('Ma tâche')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('À faire')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ma tâche' })).toHaveAttribute('href', '/tasks/edit/1')
    expect(screen.getByRole('link', { name: 'Modifier' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Supprimer' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Terminer' })).toBeInTheDocument()
  })

  it("n'affiche pas le bouton 'Terminer' quand status = done", () => {
    const task: TaskType = { ...baseTask, status: 'done' }
    renderWithRouter(<Task task={task} />)
    expect(screen.queryByRole('button', { name: 'Terminer' })).toBeNull()
    expect(screen.getByText('Terminée')).toBeInTheDocument()
  })

  it('appelle onMarkDone quand on clique sur Terminer', async () => {
    const user = userEvent.setup()
    const onMarkDone = vi.fn()
    renderWithRouter(<Task task={baseTask} onMarkDone={onMarkDone} />)
    await user.click(screen.getByRole('button', { name: 'Terminer' }))
    expect(onMarkDone).toHaveBeenCalledTimes(1)
    expect(onMarkDone).toHaveBeenCalledWith(baseTask)
  })

  it("appelle onDelete quand on clique sur 'Supprimer'", async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    renderWithRouter(<Task task={baseTask} onDelete={onDelete} />)
    await user.click(screen.getByRole('button', { name: 'Supprimer' }))
    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(onDelete).toHaveBeenCalledWith(baseTask)
  })
})
