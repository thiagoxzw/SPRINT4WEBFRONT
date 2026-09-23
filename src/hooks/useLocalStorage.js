import { useCallback, useEffect, useState } from 'react'

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

// Estado do React sincronizado com o localStorage. Se a chave mudar (ex.: outro usuário), relê o valor salvo.
export function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => ({ key, value: read(key, initialValue) }))

  let current = state
  if (state.key !== key) {
    current = { key, value: read(key, initialValue) }
    setState(current)
  }

  useEffect(() => {
    try {
      if (current.value === null || current.value === undefined) localStorage.removeItem(current.key)
      else localStorage.setItem(current.key, JSON.stringify(current.value))
    } catch {
      // armazenamento indisponível (ex.: modo privado): mantém apenas em memória
    }
  }, [current.key, current.value])

  const setValue = useCallback((next) => {
    setState((prev) => ({ key: prev.key, value: typeof next === 'function' ? next(prev.value) : next }))
  }, [])

  return [current.value, setValue]
}
