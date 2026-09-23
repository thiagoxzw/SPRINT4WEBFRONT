import { Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/funcionalidades', label: 'Funcionalidades' },
  { to: '/contato', label: 'Contato' },
]

export default function Footer() {
  return (
    <footer className="bg-navy px-4 py-8 text-slate-400 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center text-sm md:flex-row md:text-left">
        <p>© 2026 NextStage — Challenge FIAP x JOVI.</p>
        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap justify-center gap-5">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition hover:text-jovi-teal">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
