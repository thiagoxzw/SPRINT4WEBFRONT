import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// Rota privada: sem sessão, redireciona para /login guardando a página de origem.
export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />
  return <Outlet />
}
