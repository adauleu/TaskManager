import axios, { type AxiosResponse } from 'axios'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { TOKEN_KEY } from './constants'
import { axiosInstance } from './api'

export default function Login() {
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
      localStorage.setItem(TOKEN_KEY, result.data.accessToken)
      // Set the AUTH token for any request
      axiosInstance.interceptors.request.use(function (config) {
        const token = localStorage.getItem(TOKEN_KEY)
        config.headers.Authorization = token ? `Bearer ${token}` : ''
        return config
      })
      navigate('/tasks')
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        // Vous pouvez gérer l'erreur ici, par exemple afficher un message à l'utilisateur
        toast.error(err.response.data)
      } else {
        // Gérer d'autres types d'erreurs
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
