import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateTask from './pages/CreateTask'
import EditTask from './pages/EditTask'
import type { PropsWithChildren } from 'react'
import { useAuth } from './context/AuthContext'

function PrivateRoute({ children }: PropsWithChildren<object>) {
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" />
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto p-4">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/tasks">
            <Route
              index
              element={
                <PrivateRoute>
                  <Tasks />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/create"
              element={
                <PrivateRoute>
                  <CreateTask />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/edit/:id"
              element={
                <PrivateRoute>
                  <EditTask />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
