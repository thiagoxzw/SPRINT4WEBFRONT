import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ProtectedRoute from './routes/ProtectedRoute'
import GuestRoute from './routes/GuestRoute'
import Home from './pages/Home'
import About from './pages/About'
import Features from './pages/Features'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ContentDetail from './pages/ContentDetail'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Rotas públicas */}
        <Route index element={<Home />} />
        <Route path="sobre" element={<About />} />
        <Route path="funcionalidades" element={<Features />} />
        <Route path="contato" element={<Contact />} />

        <Route element={<GuestRoute />}>
          <Route path="login" element={<Login />} />
        </Route>

        {/* Rotas privadas (exigem login) */}
        <Route element={<ProtectedRoute />}>
          <Route path="meu-modo-aula" element={<Dashboard />} />
          <Route path="meu-modo-aula/conteudo/:id" element={<ContentDetail />} />
          <Route path="perfil" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
