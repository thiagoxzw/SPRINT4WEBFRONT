import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// Rota apenas para visitantes (ex.: login): quem já está logado vai direto para a área pessoal.
export default function GuestRoute() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Navigate to="/meu-modo-aula" replace /> : <Outlet />
}
