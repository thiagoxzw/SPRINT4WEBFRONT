import { Link } from 'react-router-dom'
import PageHero from '../components/ui/PageHero'
import Section from '../components/ui/Section'
import SectionHeader from '../components/ui/SectionHeader'
import FeatureCard from '../components/FeatureCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const publicos = [
  {
    icon: '🎓',
    title: 'Estudantes do ensino médio, técnico e superior',
    desc: 'Quem usa o smartphone JOVI para fotografar lousas, slides, questões e anotações de aula.',
    color: 'blue',
  },
  {
    icon: '👥',
    title: 'Grupos de estudo',
    desc: 'Estudantes que trocam material entre si e querem compartilhar uma matéria já organizada.',
    color: 'teal',
  },
  {
    icon: '📱',
    title: 'Usuários da linha JOVI',
    desc: 'Pessoas que querem explorar a câmera além do modo automático, com recursos que fazem sentido no dia a dia.',
    color: 'orange',
  },
]

const dores = [
  {
    icon: '🗂️',
    title: 'Material misturado',
    desc: 'As fotos de aula se perdem entre as fotos pessoais, e o estudante gasta tempo procurando o que precisa antes da prova.',
    color: 'blue',
  },
  {
    icon: '🤔',
    title: 'Conteúdo não compreendido',
    desc: 'Resolver uma única questão exige digitar o enunciado, pesquisar e abrir várias abas, sem chegar a uma explicação clara.',
    color: 'teal',
  },
  {
    icon: '🔁',
    title: 'Revisão esquecida',
    desc: 'O que é fotografado raramente volta a ser estudado. Falta uma forma simples de revisar antes da prova.',
    color: 'orange',
  },
]

export default function PublicoAlvo() {
  useDocumentTitle('Público-Alvo')

  return (
    <>
      <PageHero
        badge="Público-Alvo"
        title="Para quem é a"
        highlight="Câmera Inteligente"
        description="Estudantes que vivem entre aulas, trabalho e transporte, e que precisam entender o conteúdo rápido e ter tudo em um só lugar."
      />

      <Section>
        <SectionHeader title="Quem são os usuários" subtitle="O público principal é o estudante de ensino médio, técnico e superior." />
        <div className="grid gap-6 md:grid-cols-3">
          {publicos.map((p) => (
            <FeatureCard key={p.title} {...p} />
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-extrabold text-navy sm:text-3xl">
              Persona: <span className="text-jovi-blue">Lucas, 19 anos</span>
            </h2>
            <p className="mt-4 text-slate-600">
              Universitário com rotina corrida entre aulas, trabalho e transporte. Fotografa muito conteúdo durante as aulas, mas
              raramente volta a ele. Estuda à noite e, quando trava em uma questão, perde tempo pesquisando em várias abas.
            </p>
            <p className="mt-3 text-slate-600">
              Lucas quer entender o conteúdo rápido e ter tudo em um só lugar. A câmera JOVI com o modo ESTUDO foi pensada para ele.
            </p>
          </div>
          <div className="grid gap-4">
            {dores.map((d) => (
              <FeatureCard key={d.title} {...d} />
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-extrabold text-navy sm:text-3xl">Quer conhecer a solução?</h2>
          <p className="mt-3 text-slate-600">Veja as funcionalidades pensadas para esse público ou fale com a equipe.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link to="/funcionalidades" className="rounded-md bg-jovi-blue px-5 py-2.5 text-sm font-medium text-white transition hover:bg-jovi-teal">
              Ver funcionalidades
            </Link>
            <Link to="/contato" className="rounded-md border border-jovi-blue px-5 py-2.5 text-sm font-medium text-jovi-blue transition hover:bg-jovi-blue hover:text-white">
              Fale com a equipe
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
