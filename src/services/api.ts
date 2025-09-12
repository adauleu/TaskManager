import axios from 'axios'
import type { Task } from '../types'
import { TOKEN_KEY } from '../context/AuthProvider'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
})
// Set the AUTH token for any request
axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(TOKEN_KEY)
    }
    return Promise.reject(error)
  },
)
export async function getTasks() {
  const tasksResult = await axiosInstance.get<Task[]>('/tasks')
  return tasksResult.data
}

export async function createTask(payload: Omit<Task, 'id'>) {
  const result = await axiosInstance.post<Task>('/tasks', payload)
  return result.data
}

export async function getTask(id: number | string) {
  const result = await axiosInstance.get<Task>(`/tasks/${id}`)
  return result.data
}

export async function updateTask(id: number | string, payload: Partial<Omit<Task, 'id'>>) {
  const result = await axiosInstance.patch<Task>(`/tasks/${id}`, payload)
  return result.data
}

export async function deleteTask(id: number | string) {
  const result = await axiosInstance.delete<Task>(`/tasks/${id}`)
  return result.data
}
