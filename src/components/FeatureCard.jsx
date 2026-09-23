import { softBg } from '../data/colors'

export default function FeatureCard({ icon, title, desc, color = 'blue', dark = false }) {
  return (
    <article
      className={`h-full rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        dark ? 'border-transparent bg-card' : 'border-slate-200 bg-white hover:border-jovi-blue/40'
      }`}
    >
      <div className={`mb-4 flex size-14 items-center justify-center rounded-xl text-2xl ${softBg[color]}`}>{icon}</div>
      <h3 className={`mb-2 font-heading text-lg font-bold ${dark ? 'text-white' : 'text-navy'}`}>{title}</h3>
      <p className={dark ? 'text-slate-400' : 'text-slate-600'}>{desc}</p>
    </article>
  )
}
