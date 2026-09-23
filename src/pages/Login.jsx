import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'
import FormField, { inputClasses } from '../components/ui/FormField'
import { useAuth } from '../hooks/useAuth'
import { useForm } from '../hooks/useForm'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { demoUsers } from '../services/authService'
import { isValidEmail } from '../utils/validators'

const validate = (v) => {
  const errors = {}
  if (!isValidEmail(v.email)) errors.email = 'Informe um e-mail válido.'
  if (v.password.length < 6) errors.password = 'A senha precisa ter pelo menos 6 caracteres.'
  return errors
}

export default function Login() {
  useDocumentTitle('Entrar')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [authError, setAuthError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const redirectTo = location.state?.from?.pathname ?? '/meu-modo-aula'

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate,
    onSubmit: async ({ email, password }) => {
      setAuthError('')
      try {
        await login(email, password)
        navigate(redirectTo, { replace: true })
      } catch (err) {
        setAuthError(err.message)
      }
    },
  })

  return (
    <section className="flex min-h-[80vh] items-center bg-linear-to-br from-navy via-night to-[#1a2555] px-4 py-12 sm:px-6">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2">
        <div className="text-white">
          <h1 className="font-heading text-3xl font-extrabold sm:text-4xl">
            Acesse sua <span className="text-jovi-teal">Conta JOVI</span>
          </h1>
          <p className="mt-4 text-slate-400">Entre para gerenciar seus conteúdos acadêmicos, preferências do Modo Aula e histórico de uso.</p>
          {location.state?.from && (
            <div className="mt-6">
              <Alert tone="info">🔒 Essa página é privada. Faça login para continuar.</Alert>
            </div>
          )}
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
            <p className="mb-2 font-semibold text-jovi-teal">Usuários de teste</p>
            <ul className="space-y-1 text-slate-300">
              {demoUsers.map((u) => (
                <li key={u.email}>
                  {u.role}: <code className="text-white">{u.email}</code> / <code className="text-white">{u.password}</code>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form onSubmit={form.handleSubmit} noValidate className="rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
          <h2 className="mb-6 font-heading text-2xl font-bold text-navy">Login</h2>
          <FormField label="E-mail" htmlFor="email" error={form.fieldError('email')}>
            <input type="email" autoComplete="username" className={inputClasses} placeholder="seu@email.com" aria-invalid={Boolean(form.fieldError('email'))} {...form.register('email')} />
          </FormField>
          <FormField label="Senha" htmlFor="password" error={form.fieldError('password')}>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className={`${inputClasses} pr-20`}
                placeholder="Sua senha"
                aria-invalid={Boolean(form.fieldError('password'))}
                {...form.register('password')}
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute inset-y-0 right-3 text-xs font-semibold text-jovi-blue">
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </FormField>
          {authError && (
            <div className="mb-4">
              <Alert tone="error">{authError}</Alert>
            </div>
          )}
          <Button type="submit" className="w-full" disabled={form.submitting}>
            {form.submitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </div>
    </section>
  )
}
