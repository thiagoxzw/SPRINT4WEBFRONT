import { useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { useAuth } from '../../hooks/useAuth'
import { useToggle } from '../../hooks/useToggle'

const links = [
  { to: '/', label: 'Início', end: true },
  { to: '/sobre', label: 'Sobre' },
  { to: '/funcionalidades', label: 'Funcionalidades' },
  { to: '/contato', label: 'Contato' },
  { to: '/meu-modo-aula', label: 'Meu Modo Aula', private: true },
]

const linkClass = ({ isActive }) =>
  `block border-b-2 py-2 text-sm font-medium transition md:py-1 ${isActive ? 'border-jovi-teal text-white' : 'border-transparent text-slate-400 hover:text-white'}`

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const menu = useToggle(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { close } = menu

  // Fecha o menu mobile a cada troca de rota e com a tecla Esc.
  useEffect(() => close(), [pathname, close])
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-lg shadow-black/30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Logo />

        <button
          className="rounded-md p-2 text-2xl text-white md:hidden"
          onClick={menu.toggle}
          aria-expanded={menu.on}
          aria-controls="menu-principal"
          aria-label={menu.on ? 'Fechar menu' : 'Abrir menu'}
        >
          {menu.on ? '✕' : '☰'}
        </button>

        <nav
          id="menu-principal"
          className={`${menu.on ? 'block' : 'hidden'} absolute inset-x-0 top-full border-t border-white/10 bg-navy px-4 pb-4 md:static md:block md:border-0 md:p-0`}
        >
          <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-6 lg:gap-8">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end} className={linkClass}>
                  {link.label}
                  {link.private && !isAuthenticated && <span className="ml-1 text-xs">🔒</span>}
                </NavLink>
              </li>
            ))}
            <li className="mt-2 md:mt-0">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <NavLink to="/perfil" className="rounded-md bg-jovi-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-jovi-teal">
                    Olá, {user.name.split(' ')[0]}
                  </NavLink>
                  <button onClick={handleLogout} className="text-sm text-slate-400 transition hover:text-white">
                    Sair
                  </button>
                </div>
              ) : (
                <NavLink to="/login" className="inline-block rounded-md bg-jovi-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-jovi-teal">
                  Entrar
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
