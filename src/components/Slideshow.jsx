import { useSlideshow } from '../hooks/useSlideshow'
import { softBg } from '../data/colors'

// Componente visual do slideshow; toda a lógica fica no hook useSlideshow.
export default function Slideshow({ items }) {
  const { index, paused, next, prev, goTo, togglePause } = useSlideshow(items.length, { interval: 4500 })
  const slide = items[index]

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }

  return (
    <div
      className="mx-auto max-w-2xl rounded-3xl bg-card p-6 text-center text-white outline-none focus-visible:ring-2 focus-visible:ring-jovi-teal sm:p-10"
      tabIndex={0}
      onKeyDown={onKeyDown}
      aria-roledescription="carrossel"
      aria-label="Funcionalidades do Modo Aula"
    >
      <div key={index} className="animate-fade-in" aria-live="polite">
        <div className={`mx-auto mb-4 flex size-20 items-center justify-center rounded-2xl text-4xl ${softBg[slide.color]}`}>{slide.icon}</div>
        <h3 className="font-heading text-xl font-bold sm:text-2xl">{slide.title}</h3>
        <p className="mt-2 text-slate-400">{slide.desc}</p>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button onClick={prev} className="rounded-lg border border-slate-600 bg-gray-900 px-4 py-2 transition hover:border-jovi-teal" aria-label="Slide anterior">
          ←
        </button>
        <span className="min-w-14 text-sm text-slate-400">
          {index + 1} / {items.length}
        </span>
        <button onClick={next} className="rounded-lg border border-slate-600 bg-gray-900 px-4 py-2 transition hover:border-jovi-teal" aria-label="Próximo slide">
          →
        </button>
        <button onClick={togglePause} className="rounded-lg border border-slate-600 bg-gray-900 px-4 py-2 transition hover:border-jovi-teal" aria-label={paused ? 'Retomar' : 'Pausar'}>
          {paused ? '▶' : '❚❚'}
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={item.title}
            onClick={() => goTo(i)}
            aria-label={`Ir para ${item.title}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-jovi-teal' : 'w-2 bg-slate-600 hover:bg-slate-400'}`}
          />
        ))}
      </div>
    </div>
  )
}
