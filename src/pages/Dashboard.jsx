import Badge from '../components/ui/Badge'
import Alert from '../components/ui/Alert'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import { inputClasses } from '../components/ui/FormField'
import Stats from '../components/Stats'
import ContentCard from '../components/ContentCard'
import AddContentForm from '../components/AddContentForm'
import AddSubjectForm from '../components/AddSubjectForm'
import HistoryList from '../components/HistoryList'
import { useAuth } from '../hooks/useAuth'
import { useContents } from '../hooks/useContents'
import { useSubjects } from '../hooks/useSubjects'
import { useContentStats } from '../hooks/useContentStats'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { apiMode } from '../services/httpClient'

const panel = 'rounded-2xl border border-slate-200 bg-white p-5 sm:p-6'

export default function Dashboard() {
  useDocumentTitle('Meu Modo Aula')
  const { user } = useAuth()
  const contents = useContents()
  const { subjects, addSubject } = useSubjects()
  const stats = useContentStats(contents.active, contents.trash, subjects)
  const { filters } = contents

  return (
    <div className="bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge>Área pessoal</Badge>
            <h1 className="mt-3 font-heading text-3xl font-extrabold text-navy sm:text-4xl">
              Olá, {user.name.split(' ')[0]}!{' '}
              <span className="align-middle rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800">🔒 Privado</span>
            </h1>
            <p className="mt-1 text-slate-600">Central de conteúdo acadêmico do Modo Aula.</p>
          </div>
          <p className="text-xs text-slate-500">
            Fonte de dados: <strong>{apiMode}</strong>
          </p>
        </header>

        <Stats stats={stats} />
        <p className="text-xs text-slate-500">
          Organização calculada com Math.round() e Math.min() a partir de matérias usadas, anotações e favoritos. Lixeira: {stats.trashed} item(ns).
        </p>

        {contents.error && (
          <Alert tone="error" action={<button className="font-semibold underline" onClick={contents.reload}>Tentar novamente</button>}>
            {contents.error}
          </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className={panel} aria-labelledby="central-title">
            <div className="mb-4">
              <h2 id="central-title" className="font-heading text-xl font-bold text-navy">
                Central de Conteúdo
              </h2>
              <p className="text-sm text-slate-500">Busque, favorite, organize e recupere seus materiais.</p>
            </div>

            <AddContentForm key={subjects.length} subjects={subjects} onAdd={contents.add} busy={contents.busyId === 'new'} />

            <div className="my-4 grid gap-3 sm:grid-cols-[1fr_200px_auto] sm:items-center">
              <label htmlFor="search" className="sr-only">
                Buscar
              </label>
              <input id="search" className={inputClasses} value={filters.query} onChange={(e) => contents.setQuery(e.target.value)} placeholder="🔎 Buscar conteúdo..." />
              <label htmlFor="filter-subject" className="sr-only">
                Filtrar por matéria
              </label>
              <select id="filter-subject" className={inputClasses} value={filters.subject} onChange={(e) => contents.setSubject(e.target.value)}>
                <option>Todas</option>
                {subjects.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" className="size-4 accent-jovi-blue" checked={filters.onlyFavorites} onChange={(e) => contents.setOnlyFavorites(e.target.checked)} />
                Só favoritos
              </label>
            </div>

            {contents.status === 'loading' ? (
              <Spinner label="Carregando conteúdos da API..." />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {contents.filtered.map((item) => (
                  <ContentCard key={item.id} item={item} busy={contents.busyId === item.id} onFavorite={contents.toggleFavorite} onTrash={contents.moveToTrash} />
                ))}
                {contents.status === 'ready' && contents.filtered.length === 0 && <EmptyState>Nenhum conteúdo encontrado.</EmptyState>}
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <div className={panel}>
              <AddSubjectForm subjects={subjects} onAdd={addSubject} />
            </div>
            <div className={panel}>
              <HistoryList history={contents.history} onClear={contents.clearHistory} />
            </div>
          </aside>
        </div>

        <section className={panel} aria-labelledby="trash-title">
          <h2 id="trash-title" className="font-heading text-xl font-bold text-navy">
            🗑 Lixeira
          </h2>
          <p className="mb-4 text-sm text-slate-500">Recupere itens excluídos ou apague-os definitivamente da API.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contents.trash.length ? (
              contents.trash.map((item) => (
                <ContentCard key={item.id} item={item} inTrash busy={contents.busyId === item.id} onRestore={contents.restore} onDestroy={contents.destroy} />
              ))
            ) : (
              <EmptyState icon="🗑">A lixeira está vazia.</EmptyState>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
