const tones = {
  light: 'bg-white',
  muted: 'bg-slate-50',
  dark: 'bg-navy',
}

export default function Section({ tone = 'light', className = '', children }) {
  return (
    <section className={`px-4 py-16 sm:px-6 md:py-20 ${tones[tone]} ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}
