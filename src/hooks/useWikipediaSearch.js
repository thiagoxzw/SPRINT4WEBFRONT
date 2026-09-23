import { useEffect, useState } from 'react'
import { useDebounce } from './useDebounce'
import { searchWikipedia } from '../services/wikipediaService'

const IDLE = { status: 'idle', results: [], error: null }

export function useWikipediaSearch(term) {
  const debounced = useDebounce(term.trim(), 500)
  const [state, setState] = useState(IDLE)

  useEffect(() => {
    if (debounced.length < 3) {
      setState(IDLE)
      return
    }
    const controller = new AbortController()
    setState((prev) => ({ ...prev, status: 'loading', error: null }))
    searchWikipedia(debounced, { signal: controller.signal })
      .then((results) => setState({ status: 'success', results, error: null }))
      .catch((error) => {
        if (error.name === 'AbortError') return
        setState({ status: 'error', results: [], error: 'Não foi possível consultar a Wikipédia agora. Verifique sua conexão e tente novamente.' })
      })
    return () => controller.abort()
  }, [debounced])

  return { ...state, term: debounced }
}
