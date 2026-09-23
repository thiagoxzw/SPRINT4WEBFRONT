import Button from './ui/Button'
import { inputClasses } from './ui/FormField'
import { contentTypes } from '../data/features'
import { useForm } from '../hooks/useForm'

const validate = (v) => (v.title.trim().length < 3 ? { title: 'O título precisa ter ao menos 3 caracteres.' } : {})

export default function AddContentForm({ subjects, onAdd, busy }) {
  const form = useForm({
    initialValues: { title: '', subject: subjects[0] ?? '', type: contentTypes[2] },
    validate,
    onSubmit: async (values, { reset }) => {
      const created = await onAdd(values)
      if (created) reset()
    },
  })
  const error = form.fieldError('title')

  return (
    <form onSubmit={form.handleSubmit} noValidate className="rounded-xl bg-slate-50 p-4">
      <p className="mb-3 text-sm font-semibold text-navy">+ Novo conteúdo</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(9rem,1fr)_auto]">
        <div>
          <label htmlFor="title" className="sr-only">
            Título
          </label>
          <input className={inputClasses} placeholder="Ex.: Aula de React" aria-invalid={Boolean(error)} {...form.register('title')} />
        </div>
        <div>
          <label htmlFor="subject" className="sr-only">
            Matéria
          </label>
          <select className={inputClasses} {...form.register('subject')}>
            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="type" className="sr-only">
            Tipo
          </label>
          <select className={inputClasses} {...form.register('type')}>
            {contentTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <Button type="submit" disabled={busy || form.submitting}>
          {form.submitting ? 'Salvando...' : 'Adicionar'}
        </Button>
      </div>
      {error && <p className="mt-2 text-sm text-jovi-red">{error}</p>}
    </form>
  )
}
