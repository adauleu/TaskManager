import { NavLink, useNavigate } from 'react-router-dom'
import { TOKEN_KEY } from '../pages/constants'

export default function Header() {
  const token = localStorage.getItem(TOKEN_KEY)
  const isConnected = !!token
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    navigate('/login')
  }

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">TaskManager</h1>
        <nav>
          <NavLink className="mr-4" to="/" end>
            Accueil
          </NavLink>
          <NavLink className="mr-4" to="/tasks" hidden={!isConnected}>
            Tâches
          </NavLink>
          <NavLink className="mr-4" to="/login" hidden={isConnected} end>
            Connexion
          </NavLink>
          <NavLink className="mr-4" to="/register" hidden={isConnected} end>
            Inscription
          </NavLink>

          {isConnected && (
            <button className="underline" onClick={logout}>
              Déconnexion
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
