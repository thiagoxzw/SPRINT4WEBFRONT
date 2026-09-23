import { useState } from 'react'
import PageHero from '../components/ui/PageHero'
import Section from '../components/ui/Section'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'
import FormField, { inputClasses } from '../components/ui/FormField'
import { contactSubjects } from '../data/features'
import { useForm } from '../hooks/useForm'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { isValidEmail } from '../utils/validators'

const validate = (v) => {
  const errors = {}
  if (v.nome.trim().length < 3) errors.nome = 'Informe seu nome completo (mínimo 3 letras).'
  if (!isValidEmail(v.email)) errors.email = 'Informe um e-mail válido.'
  if (!v.assunto) errors.assunto = 'Selecione um assunto.'
  if (v.msg.trim().length < 10) errors.msg = 'A mensagem precisa ter pelo menos 10 caracteres.'
  return errors
}

export default function Contact() {
  useDocumentTitle('Contato')
  const [messages, setMessages] = useLocalStorage('jovi_contact_messages', [])
  const [sent, setSent] = useState(false)

  const form = useForm({
    initialValues: { nome: '', email: '', assunto: '', msg: '' },
    validate,
    onSubmit: (values, { reset }) => {
      setMessages((prev) => [{ ...values, sentAt: new Date().toISOString() }, ...prev].slice(0, 20))
      setSent(true)
      reset()
    },
  })

  const field = (name) => ({ ...form.register(name), 'aria-invalid': Boolean(form.fieldError(name)), onFocus: () => setSent(false) })

  return (
    <>
      <PageHero badge="Contato" title="Fale com a" highlight="NextStage" description="Quer participar do beta ou tem alguma sugestão? Envie sua mensagem." />

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-heading text-2xl font-extrabold text-navy">Por que falar com a gente?</h2>
            <ul className="mt-4 space-y-3 text-slate-600">
              <li>🧪 Participe do programa beta do Modo Aula.</li>
              <li>💡 Sugira funcionalidades para a próxima versão.</li>
              <li>🐞 Reporte problemas encontrados no protótipo.</li>
            </ul>
            <p className="mt-6 text-sm text-slate-500">
              Mensagens enviadas neste protótipo: <strong>{messages.length}</strong> (armazenadas apenas no seu navegador).
            </p>
          </div>

          <form onSubmit={form.handleSubmit} noValidate className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <FormField label="Nome completo" htmlFor="nome" error={form.fieldError('nome')}>
              <input className={inputClasses} placeholder="Seu nome" {...field('nome')} />
            </FormField>
            <FormField label="E-mail" htmlFor="email" error={form.fieldError('email')}>
              <input type="email" className={inputClasses} placeholder="seu@email.com" {...field('email')} />
            </FormField>
            <FormField label="Assunto" htmlFor="assunto" error={form.fieldError('assunto')}>
              <select className={inputClasses} {...field('assunto')}>
                <option value="">Selecione um assunto</option>
                {contactSubjects.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Mensagem" htmlFor="msg" error={form.fieldError('msg')} hint={`${form.values.msg.length} caracteres`}>
              <textarea rows={5} className={inputClasses} placeholder="Escreva sua mensagem..." {...field('msg')} />
            </FormField>
            <Button type="submit" className="w-full" disabled={form.submitting}>
              Enviar Mensagem
            </Button>
            {sent && (
              <div className="mt-4">
                <Alert tone="success">✓ Mensagem validada e registrada. Obrigado pelo contato!</Alert>
              </div>
            )}
          </form>
        </div>
      </Section>
    </>
  )
}
