import { type PropsWithChildren, useState, useEffect } from 'react'
import { AuthContext, type Token } from './AuthContext'

export const TOKEN_KEY = 'accessToken'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<Token>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY)
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  function updateToken(newToken: Token) {
    setToken(newToken)
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
  }

  return <AuthContext.Provider value={{ token, updateToken }}>{children}</AuthContext.Provider>
}
