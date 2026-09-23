import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'
import Spinner from '../components/ui/Spinner'
import FormField, { inputClasses } from '../components/ui/FormField'
import StudyReferences from '../components/StudyReferences'
import { useContent } from '../hooks/useContent'
import { useSubjects } from '../hooks/useSubjects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function NotesEditor({ item, subjects, saving, onSave }) {
  const [notes, setNotes] = useState(item.notes)
  const [subject, setSubject] = useState(item.subject)
  const [saved, setSaved] = useState(false)
  const dirty = notes !== item.notes || subject !== item.subject

  const submit = async (e) => {
    e.preventDefault()
    setSaved(await onSave({ notes, subject }))
  }

  return (
    <form onSubmit={submit}>
      <FormField label="Matéria" htmlFor="detail-subject">
        <select id="detail-subject" className={inputClasses} value={subject} onChange={(e) => setSubject(e.target.value)}>
          {[...new Set([item.subject, ...subjects])].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </FormField>
      <FormField label="Anotações / texto OCR" htmlFor="detail-notes" hint={`${notes.length} caracteres`}>
        <textarea id="detail-notes" rows={8} className={inputClasses} value={notes} onChange={(e) => { setNotes(e.target.value); setSaved(false) }} placeholder="Cole aqui o texto extraído da lousa ou suas anotações..." />
      </FormField>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={!dirty || saving}>
          {saving ? 'Salvando...' : 'Salvar alterações'}
        </Button>
        {saved && !dirty && <span className="text-sm text-green-700">✓ Salvo na API</span>}
      </div>
    </form>
  )
}

export default function ContentDetail() {
  const { id } = useParams()
  const { item, status, saving, error, save } = useContent(id)
  const { subjects } = useSubjects()
  useDocumentTitle(item?.title ?? 'Conteúdo')

  if (status === 'loading') return <Spinner label="Carregando conteúdo..." />

  if (status === 'not-found' || status === 'error') {
    return (
      <section className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="font-heading text-2xl font-bold text-navy">{status === 'not-found' ? 'Conteúdo não encontrado' : 'Erro ao carregar'}</h1>
        <p className="mt-2 text-slate-600">{status === 'not-found' ? 'Ele pode ter sido excluído ou pertence a outro usuário.' : error}</p>
        <Button to="/meu-modo-aula" className="mt-6">
          ← Voltar para Meu Modo Aula
        </Button>
      </section>
    )
  }

  return (
    <div className="bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Button to="/meu-modo-aula" variant="ghost" size="sm">
          ← Voltar
        </Button>
        <header className="mt-3 mb-6">
          <span className="rounded-full bg-jovi-blue/10 px-3 py-1 text-xs font-semibold text-jovi-blue">{item.subject}</span>
          <h1 className="mt-3 font-heading text-3xl font-extrabold text-navy">
            {item.favorite && <span className="text-jovi-yellow">★ </span>}
            {item.title}
          </h1>
          <p className="text-sm text-slate-500">
            {item.type} • criado em {new Date(item.createdAt).toLocaleString('pt-BR', { dateStyle: 'long', timeStyle: 'short' })}
            {item.deleted && ' • na lixeira'}
          </p>
        </header>

        {error && (
          <div className="mb-4">
            <Alert tone="error">{error}</Alert>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="mb-4 font-heading text-lg font-bold text-navy">🗒 Detalhes</h2>
            <NotesEditor key={item.id} item={item} subjects={subjects} saving={saving} onSave={save} />
          </section>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <StudyReferences initialTerm={item.title} />
          </div>
        </div>
      </div>
    </div>
  )
}
