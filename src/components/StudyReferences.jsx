import { useState } from 'react'
import { useWikipediaSearch } from '../hooks/useWikipediaSearch'
import { inputClasses } from './ui/FormField'
import Spinner from './ui/Spinner'
import Alert from './ui/Alert'
import EmptyState from './ui/EmptyState'

// Consumo de API pública de terceiros (Wikipédia) para sugerir leituras relacionadas ao conteúdo.
export default function StudyReferences({ initialTerm = '' }) {
  const [term, setTerm] = useState(initialTerm)
  const { status, results, error } = useWikipediaSearch(term)

  return (
    <section aria-labelledby="refs-title">
      <h2 id="refs-title" className="font-heading text-lg font-bold text-navy">
        📚 Referências de estudo
      </h2>
      <p className="mb-3 text-sm text-slate-500">Resultados em tempo real da API pública da Wikipédia.</p>
      <label htmlFor="wiki-term" className="sr-only">
        Pesquisar na Wikipédia
      </label>
      <input id="wiki-term" className={inputClasses} value={term} onChange={(e) => setTerm(e.target.value)} placeholder="🔎 Pesquisar tema (mín. 3 letras)" />

      <div className="mt-4">
        {status === 'idle' && <EmptyState icon="🔎">Digite pelo menos 3 letras para pesquisar.</EmptyState>}
        {status === 'loading' && <Spinner label="Consultando a Wikipédia..." />}
        {status === 'error' && <Alert tone="error">{error}</Alert>}
        {status === 'success' && results.length === 0 && <EmptyState>Nenhum artigo encontrado.</EmptyState>}
        {status === 'success' && results.length > 0 && (
          <ul className="space-y-3">
            {results.map((r) => (
              <li key={r.id} className="rounded-lg border border-slate-200 p-3 transition hover:border-jovi-blue/50">
                <a href={r.url} target="_blank" rel="noreferrer" className="font-semibold text-jovi-blue hover:underline">
                  {r.title} ↗
                </a>
                <p className="mt-1 text-sm text-slate-600">{r.snippet}…</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
