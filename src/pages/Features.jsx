import PageHero from '../components/ui/PageHero'
import Section from '../components/ui/Section'
import SectionHeader from '../components/ui/SectionHeader'
import FeatureCard from '../components/FeatureCard'
import Slideshow from '../components/Slideshow'
import { features } from '../data/features'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Features() {
  useDocumentTitle('Funcionalidades')

  return (
    <>
      <PageHero badge="Funcionalidades" title="Tudo que o" highlight="Modo Aula oferece" description="Cada funcionalidade foi pensada para resolver dores reais dos estudantes." />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeader dark title="Explore a experiência" subtitle="Use as setas (ou ← → do teclado). O slideshow avança sozinho e pode ser pausado." />
        <Slideshow items={features} />
      </Section>
    </>
  )
}
