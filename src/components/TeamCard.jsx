import { softBg } from '../data/colors'

export default function TeamCard({ name, rm, role, color }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
      <div className={`mx-auto mb-4 flex size-16 items-center justify-center rounded-full text-2xl ${softBg[color]}`}>👤</div>
      <h3 className="text-sm font-bold text-navy">{name}</h3>
      <p className="mt-1 text-xs text-slate-500">{rm}</p>
      <p className="text-xs text-slate-500">{role}</p>
    </article>
  )
}
