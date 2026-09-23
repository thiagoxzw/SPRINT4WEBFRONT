// Envolve label + campo + mensagem de erro, mantendo o visual dos formulários do protótipo.
export const inputClasses =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-jovi-blue focus:ring-2 focus:ring-jovi-blue/20 aria-[invalid=true]:border-jovi-red aria-[invalid=true]:ring-jovi-red/20'

export default function FormField({ label, htmlFor, error, hint, children }) {
  return (
    <div className="mb-4">
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-1 text-sm text-jovi-red">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>
      )}
    </div>
  )
}
