export default function Badge({ children, className = '' }) {
  return (
    <span className={`inline-block rounded-full border border-jovi-blue bg-jovi-blue/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-jovi-teal ${className}`}>
      {children}
    </span>
  )
}
