import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="JOVI Modo Aula — página inicial">
      <span className="flex size-9 items-center justify-center rounded-full bg-jovi-blue text-lg">📷</span>
      <span className="leading-none">
        <span className="block font-heading text-xl font-extrabold tracking-wider text-white">JOVI</span>
        <span className="block text-[0.7rem] tracking-wide text-jovi-teal">MODO AULA</span>
      </span>
    </Link>
  )
}
