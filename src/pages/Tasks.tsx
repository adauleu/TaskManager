import { NavLink } from 'react-router-dom'

export default function Tasks() {
  return (
    <div>
      <h2>Mes Tâches</h2>
      <NavLink className="inline-block mb-4 text-blue-600 underline" to="/create">
        + Nouvelle tâche
      </NavLink>
      <div className="border rounded p-4 mb-3 shadow flex justify-between items-center bg-white hover:bg-gray-50 transition">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
              À faire
            </span>
            <NavLink className="text-lg font-semibold " to="/tasks/create">
              Apprendre à utiliser React
            </NavLink>
          </div>
          <p className="text-sm text-gray-600 mt-1">Bases de React + React avancé</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-green-500 text-white px-3 py-1 rounded">Terminer</button>
          <NavLink className="bg-yellow-500 text-white px-3 py-1 rounded" to="/tasks/edit">
            Modifier
          </NavLink>
          <button className="bg-red-500 text-white px-3 py-1 rounded">Supprimer</button>
        </div>
      </div>
      <div className="border rounded p-4 mb-3 shadow flex justify-between items-center bg-white hover:bg-gray-50 transition">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded-full bg-green-200 text-green-800">
              Terminée
            </span>
            <NavLink className="text-lg font-semibold line-through text-gray-500" to="/tasks/edit">
              Installer VSCode
            </NavLink>
          </div>
          <p className="text-sm text-gray-600 mt-1">+ le configurer</p>
        </div>
        <div className="flex gap-2">
          <NavLink className="bg-yellow-500 text-white px-3 py-1 rounded" to="/tasks/create">
            Modifier
          </NavLink>
          <button className="bg-red-500 text-white px-3 py-1 rounded">Supprimer</button>
        </div>
      </div>
      <div className="border rounded p-4 mb-3 shadow flex justify-between items-center bg-white hover:bg-gray-50 transition">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
              À faire
            </span>
            <NavLink className="text-lg font-semibold " to="/tasks/edit">
              Faire une app de todolist
            </NavLink>
          </div>
          <p className="text-sm text-gray-600 mt-1">En React bien évidemment</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-green-500 text-white px-3 py-1 rounded">Terminer</button>
          <NavLink className="bg-yellow-500 text-white px-3 py-1 rounded" to="/tasks/edit">
            Modifier
          </NavLink>
          <button className="bg-red-500 text-white px-3 py-1 rounded">Supprimer</button>
        </div>
      </div>
    </div>
  )
}
