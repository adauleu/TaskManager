import { createContext, useContext } from 'react'

export type Token = string | null
export const AuthContext = createContext<{
  token: Token
  updateToken: (t: Token) => void
}>({
  token: null,
  updateToken: () => {},
})

export const useAuth = () => useContext(AuthContext)
