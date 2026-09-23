import { textColor } from '../../data/colors'

export default function StatCard({ value, label, color = 'blue', className = '' }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm ${className}`}>
      <div className={`font-heading text-3xl font-extrabold md:text-4xl ${textColor[color]}`}>{value}</div>
      <div className="mt-1 text-sm text-slate-500">{label}</div>
    </div>
  )
}
