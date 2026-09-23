import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Section from '../components/ui/Section'
import SectionHeader from '../components/ui/SectionHeader'
import StatCard from '../components/ui/StatCard'
import FeatureCard from '../components/FeatureCard'
import FlowSteps from '../components/FlowSteps'
import PhoneMockup from '../components/PhoneMockup'
import { features, flowSteps, researchStats } from '../data/features'
import { useAuth } from '../hooks/useAuth'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Home() {
  useDocumentTitle('Início')
  const { isAuthenticated } = useAuth()

  return (
    <>
      <section className="flex min-h-[80vh] items-center bg-linear-to-br from-navy via-night to-[#1a2555] px-4 py-16 text-white sm:px-6 md:py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-xl animate-fade-in text-center lg:text-left">
            <Badge className="mb-5">Novo no JOVI Smartphone</Badge>
            <h1 className="font-heading text-4xl leading-tight font-extrabold sm:text-5xl">
              Sua câmera.
              <br />
              Sua aula.
              <br />
              <span className="text-jovi-teal">Tudo organizado.</span>
            </h1>
            <p className="mt-5 mb-8 text-base leading-relaxed text-slate-400 sm:text-lg">
              O Modo Aula transforma a câmera do seu JOVI em uma ferramenta acadêmica inteligente. Organize fotos por matéria, extraia texto com IA e capture lousas com qualidade.
            </p>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button to={isAuthenticated ? '/meu-modo-aula' : '/login'} size="lg">
                {isAuthenticated ? 'Abrir Meu Modo Aula' : 'Experimentar o Modo Aula'}
              </Button>
              <Button to="/sobre" variant="secondary" size="lg">
                Saiba Mais
              </Button>
            </div>
          </div>
          <PhoneMockup />
        </div>
      </section>

      <Section>
        <SectionHeader title="Por que o Modo Aula?" subtitle="Três pilares que transformam como estudantes usam a câmera do smartphone." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.slice(0, 3).map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeader dark title="Como Funciona" subtitle="Em 5 passos, do quadro da sala para suas anotações digitais." />
        <FlowSteps steps={flowSteps} />
      </Section>

      <Section tone="muted">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-extrabold text-navy sm:text-3xl">
              Validado com <span className="text-jovi-teal">estudantes reais</span>
            </h2>
            <p className="mt-4 text-slate-600">O Modo Aula nasceu para resolver a desorganização, a baixa legibilidade e a fragmentação de ferramentas no estudo.</p>
            <p className="mt-3 text-slate-600">A proposta reúne captura, organização, OCR, privacidade e histórico em uma experiência única.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {researchStats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
