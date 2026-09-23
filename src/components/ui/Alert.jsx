const tones = {
  error: 'border-jovi-red/30 bg-red-50 text-red-700',
  success: 'border-jovi-green/30 bg-green-50 text-green-800',
  info: 'border-jovi-blue/30 bg-blue-50 text-blue-800',
}

export default function Alert({ tone = 'info', children, action }) {
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={`flex flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm ${tones[tone]}`}>
      <span>{children}</span>
      {action}
    </div>
  )
}
