import { useState } from 'react'
import { inputClasses } from './ui/FormField'

export default function AddSubjectForm({ subjects, onAdd }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const message = onAdd(name)
    setError(message ?? '')
    if (!message) setName('')
  }

  return (
    <div>
      <h2 className="mb-3 font-heading text-lg font-bold text-navy">📁 Matérias</h2>
      <ul className="mb-3 flex flex-wrap gap-2">
        {subjects.map((s) => (
          <li key={s} className="rounded-full bg-jovi-blue/10 px-3 py-1 text-xs font-semibold text-jovi-blue">
            {s}
          </li>
        ))}
      </ul>
      <form onSubmit={submit} className="flex gap-2">
        <label htmlFor="new-subject" className="sr-only">
          Nova matéria
        </label>
        <input id="new-subject" className={inputClasses} value={name} onChange={(e) => setName(e.target.value)} placeholder="Nova matéria" />
        <button type="submit" className="shrink-0 rounded-lg bg-navy px-4 text-sm font-semibold text-white transition hover:bg-jovi-blue">
          Criar
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-jovi-red">{error}</p>}
    </div>
  )
}
