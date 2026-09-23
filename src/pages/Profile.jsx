import { useNavigate } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const options = [
  { key: 'iaAlerts', label: 'Alertas da IA no viewfinder', desc: 'Avisos de foco, reflexo e iluminação.' },
  { key: 'autoCapture', label: 'Captura automática de slides', desc: 'Registra quando o slide muda.' },
  { key: 'autoOcr', label: 'OCR automático', desc: 'Extrai o texto logo após a captura.' },
  { key: 'privateAlbum', label: 'Álbum acadêmico privado', desc: 'Separa fotos de aula da galeria pessoal.' },
]

const defaults = { iaAlerts: true, autoCapture: false, autoOcr: true, privateAlbum: true }

export default function Profile() {
  useDocumentTitle('Perfil')
  const { user, session, logout } = useAuth()
  const navigate = useNavigate()
  const [prefs, setPrefs] = useLocalStorage(`jovi_prefs_${user.email}`, defaults)

  const toggle = (key) => setPrefs((prev) => ({ ...prev, [key]: !prev[key] }))

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[1fr_1.5fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-jovi-blue text-3xl font-bold text-white">{user.name.charAt(0)}</div>
          <h1 className="mt-4 font-heading text-2xl font-bold text-navy">{user.name}</h1>
          <p className="text-slate-500">{user.email}</p>
          <Badge className="mt-3">{user.role}</Badge>
          <p className="mt-4 text-xs text-slate-500">Sessão iniciada em {new Date(session.loggedAt).toLocaleString('pt-BR')}</p>
          <div className="mt-6 flex flex-col gap-2">
            <Button to="/meu-modo-aula">Ir para Meu Modo Aula</Button>
            <Button variant="danger" onClick={handleLogout}>
              Sair da conta
            </Button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-heading text-xl font-bold text-navy">⚙️ Preferências do Modo Aula</h2>
          <p className="mb-4 text-sm text-slate-500">Salvas automaticamente para o seu usuário.</p>
          <ul className="divide-y divide-slate-100">
            {options.map((opt) => (
              <li key={opt.key} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="font-semibold text-slate-800">{opt.label}</p>
                  <p className="text-sm text-slate-500">{opt.desc}</p>
                </div>
                <button
                  role="switch"
                  aria-checked={Boolean(prefs[opt.key])}
                  aria-label={opt.label}
                  onClick={() => toggle(opt.key)}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${prefs[opt.key] ? 'bg-jovi-green' : 'bg-slate-300'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition ${prefs[opt.key] ? 'translate-x-5' : ''}`} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
