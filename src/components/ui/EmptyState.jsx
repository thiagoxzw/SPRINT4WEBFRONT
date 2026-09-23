export default function EmptyState({ icon = '📭', children }) {
  return (
    <div className="col-span-full rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center text-slate-500">
      <div className="mb-2 text-3xl">{icon}</div>
      {children}
    </div>
  )
}
