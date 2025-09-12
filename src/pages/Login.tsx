import axios, { type AxiosResponse } from 'axios'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { axiosInstance } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { updateToken } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) {
      return
    }
    try {
      const result: AxiosResponse = await axiosInstance.post('/login', {
        email,
        password,
      })
      updateToken(result.data.accessToken)
      navigate('/tasks')
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        toast.error(err.response.data)
      } else {
        console.error(err)
      }
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Connexion</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value.trim())}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value.trim())}
        required
      />
      <button type="submit">Se connecter</button>
    </form>
  )
}
