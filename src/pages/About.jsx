import PageHero from '../components/ui/PageHero'
import Section from '../components/ui/Section'
import SectionHeader from '../components/ui/SectionHeader'
import StatCard from '../components/ui/StatCard'
import TeamCard from '../components/TeamCard'
import FeatureCard from '../components/FeatureCard'
import { team } from '../data/team'
import { problems } from '../data/features'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function About() {
  useDocumentTitle('Sobre')

  return (
    <>
      <PageHero badge="Sobre o Projeto" title="Conheça o" highlight="Modo Aula" description="Uma solução criada por estudantes para estudantes, em parceria com a JOVI e a FIAP." />

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-extrabold text-navy sm:text-3xl">
              A Empresa <span className="text-jovi-blue">JOVI</span>
            </h2>
            <p className="mt-4 text-slate-600">A JOVI é uma marca voltada ao mercado brasileiro e à experiência de tecnologia inteligente centrada no usuário.</p>
            <p className="mt-3 text-slate-600">O projeto Modo Aula propõe levar essa experiência para o contexto acadêmico, tornando a câmera uma ferramenta de estudo.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatCard value={team.length} label="Integrantes" color="blue" />
            <StatCard value="React" label="Tecnologia da Sprint" color="teal" />
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader title="Nosso Time" subtitle="Equipe NextStage — Challenge FIAP x JOVI 2026" />
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {team.map((member) => (
            <TeamCard key={member.rm} {...member} />
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeader dark title="O Problema que Resolvemos" subtitle="Dores reais do contexto de estudo." />
        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((p) => (
            <FeatureCard key={p.title} {...p} dark />
          ))}
        </div>
      </Section>
    </>
  )
}
