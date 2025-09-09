import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">TaskManager</h1>
        <nav>
          <NavLink className="mr-4" to="/" end>
            Accueil
          </NavLink>
          <NavLink className="mr-4" to="/tasks">
            Tâches
          </NavLink>
          <NavLink className="mr-4" to="/login" end>
            Connexion
          </NavLink>
          <NavLink className="mr-4" to="/register" end>
            Inscription
          </NavLink>

          <button className="underline">Déconnexion</button>
        </nav>
      </div>
    </header>
  );
}
