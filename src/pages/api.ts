import axios from 'axios'
import { TOKEN_KEY } from './constants'
import type { Task } from './types'

const accessToken = localStorage.getItem(TOKEN_KEY)
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
      }
    : undefined,
})

export async function getTasks() {
  const tasksResult = await axiosInstance.get<Task[]>('/tasks')
  return tasksResult.data
}

export async function createTask(payload: Pick<Task, 'title' | 'description' | 'status'>) {
  const result = await axiosInstance.post<Task>('/tasks', payload)
  return result.data
}
