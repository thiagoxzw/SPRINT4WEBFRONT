const subjects = [
  { label: 'Cálculo', className: 'bg-jovi-blue' },
  { label: 'Física', className: 'bg-jovi-pink' },
  { label: 'Progr.', className: 'bg-jovi-green' },
]

export default function PhoneMockup() {
  return (
    <div className="h-[440px] w-[220px] overflow-hidden rounded-[36px] border-[3px] border-gray-700 bg-gray-900 shadow-2xl shadow-black/50 sm:h-[520px] sm:w-[260px]">
      <div className="flex h-full flex-col items-center gap-3 bg-linear-to-b from-slate-900 to-slate-800 px-4 pt-10 pb-4">
        <span className="rounded-full bg-jovi-blue px-4 py-1 text-[0.7rem] font-bold tracking-widest text-white">MODO AULA</span>
        <div className="flex w-full justify-center gap-1.5">
          {subjects.map((s) => (
            <span key={s.label} className={`rounded-lg px-2.5 py-0.5 text-[0.6rem] font-semibold text-white ${s.className}`}>
              {s.label}
            </span>
          ))}
        </div>
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-gray-600 bg-linear-to-br from-gray-700 to-gray-800">
          <span className="animate-pulse rounded-xl border border-jovi-green bg-jovi-green/20 px-3 py-0.5 text-[0.6rem] font-semibold text-jovi-green">
            ✓ Foco OK — Sem reflexo
          </span>
          <span className="text-xs text-slate-400">Lousa detectada</span>
        </div>
        <div className="mt-1 size-12 rounded-full border-[3px] border-slate-400 bg-white" aria-hidden="true" />
      </div>
    </div>
  )
}
