import EmptyState from './ui/EmptyState'

const formatDateTime = (iso) => new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })

export default function HistoryList({ history, onClear }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold text-navy">🕘 Histórico</h2>
        {history.length > 0 && (
          <button onClick={onClear} className="text-xs text-slate-500 hover:text-jovi-red">
            Limpar
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <EmptyState icon="🕘">Nenhuma ação registrada ainda.</EmptyState>
      ) : (
        <ol className="max-h-80 space-y-2 overflow-y-auto pr-1">
          {history.map((h) => (
            <li key={h.id} className="rounded-lg bg-slate-50 px-3 py-2 text-sm">
              <span className="font-semibold text-navy">{h.action}</span> — {h.title}
              <div className="text-xs text-slate-500">{formatDateTime(h.at)}</div>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
