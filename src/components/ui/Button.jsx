import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-jovi-blue text-white hover:bg-jovi-teal hover:-translate-y-0.5',
  secondary: 'border-[1.5px] border-slate-400 text-white hover:border-jovi-teal hover:text-jovi-teal',
  outline: 'border border-slate-300 text-slate-700 bg-white hover:border-jovi-blue hover:text-jovi-blue',
  danger: 'bg-jovi-red/10 text-jovi-red hover:bg-jovi-red hover:text-white',
  ghost: 'text-slate-600 hover:bg-slate-100',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm sm:text-base',
  lg: 'px-8 py-3 text-base',
}

// Botão reutilizável: renderiza <Link> quando recebe "to", senão <button>.
export default function Button({ to, variant = 'primary', size = 'md', className = '', children, ...props }) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition duration-300 disabled:opacity-60 disabled:hover:translate-y-0 ${variants[variant]} ${sizes[size]} ${className}`
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  )
}
