export default function SectionHeader({ title, subtitle, dark = false }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
      <h2 className={`font-heading text-2xl font-extrabold sm:text-3xl md:text-4xl ${dark ? 'text-white' : 'text-navy'}`}>{title}</h2>
      {subtitle && <p className={`mt-3 text-base md:text-lg ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{subtitle}</p>}
    </div>
  )
}
