export default function Spinner({ label = 'Carregando...' }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-10 text-slate-500">
      <span className="size-5 animate-spin rounded-full border-2 border-jovi-blue border-t-transparent" />
      {label}
    </div>
  )
}
