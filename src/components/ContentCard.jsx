import { Link } from 'react-router-dom'

const formatDate = (iso) => new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })

const actionClass = 'rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium transition hover:border-jovi-blue hover:text-jovi-blue disabled:opacity-50'

export default function ContentCard({ item, busy = false, inTrash = false, onFavorite, onTrash, onRestore, onDestroy }) {
  return (
    <article className={`flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:shadow-md ${busy ? 'opacity-60' : ''}`}>
      <div className="flex h-24 items-center justify-center bg-linear-to-br from-navy to-night text-3xl">{item.type === 'OCR' ? '📝' : '📸'}</div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between gap-2 text-xs text-slate-500">
          <span className="rounded-full bg-jovi-blue/10 px-2.5 py-0.5 font-semibold text-jovi-blue">{item.subject}</span>
          <time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time>
        </div>
        <h3 className="font-bold text-navy">
          {inTrash ? (
            item.title
          ) : (
            <Link to={`/meu-modo-aula/conteudo/${item.id}`} className="hover:text-jovi-blue">
              {item.title}
            </Link>
          )}
        </h3>
        <p className="mb-4 text-sm text-slate-500">
          {item.type} {item.notes && '• 🗒 com anotações'}
        </p>
        <div className="mt-auto flex flex-wrap gap-2">
          {inTrash ? (
            <>
              <button className={actionClass} disabled={busy} onClick={() => onRestore(item)}>
                ↩ Restaurar
              </button>
              <button className={`${actionClass} hover:border-jovi-red hover:text-jovi-red`} disabled={busy} onClick={() => onDestroy(item)}>
                ✕ Excluir de vez
              </button>
            </>
          ) : (
            <>
              <button className={actionClass} disabled={busy} onClick={() => onFavorite(item)} aria-pressed={item.favorite}>
                {item.favorite ? '★ Favorito' : '☆ Favoritar'}
              </button>
              <button className={`${actionClass} hover:border-jovi-red hover:text-jovi-red`} disabled={busy} onClick={() => onTrash(item)}>
                🗑 Excluir
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
