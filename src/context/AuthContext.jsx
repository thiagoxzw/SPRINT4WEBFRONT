import { useCallback, useMemo } from 'react'
import { AuthContext } from './contexts'
import { useLocalStorage } from '../hooks/useLocalStorage'
import * as authService from '../services/authService'

export function AuthProvider({ children }) {
  const [session, setSession] = useLocalStorage('jovi_session', null)

  const login = useCallback(
    async (email, password) => {
      const newSession = await authService.login(email, password)
      setSession(newSession)
      return newSession.user
    },
    [setSession],
  )

  const logout = useCallback(() => setSession(null), [setSession])

  const value = useMemo(
    () => ({ user: session?.user ?? null, session, isAuthenticated: Boolean(session?.token), login, logout }),
    [session, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
