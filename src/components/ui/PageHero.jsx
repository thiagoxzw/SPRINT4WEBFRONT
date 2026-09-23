import Badge from './Badge'

export default function PageHero({ badge, title, highlight, description }) {
  return (
    <section className="bg-linear-to-br from-navy via-night to-[#1a2555] px-4 py-16 text-center text-white sm:px-6 md:py-24">
      <div className="mx-auto max-w-3xl animate-fade-in">
        {badge && <Badge className="mb-5">{badge}</Badge>}
        <h1 className="font-heading text-3xl leading-tight font-extrabold sm:text-4xl md:text-5xl">
          {title} {highlight && <span className="text-jovi-teal">{highlight}</span>}
        </h1>
        {description && <p className="mt-4 text-base text-slate-400 md:text-lg">{description}</p>}
      </div>
    </section>
  )
}
