import Button from '../components/ui/Button'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Página não encontrada')
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl">📷</div>
      <h1 className="mt-4 font-heading text-3xl font-extrabold text-navy">Página não encontrada</h1>
      <p className="mt-2 text-slate-600">O endereço acessado não existe ou foi movido.</p>
      <Button to="/" className="mt-6">
        Voltar ao início
      </Button>
    </section>
  )
}
