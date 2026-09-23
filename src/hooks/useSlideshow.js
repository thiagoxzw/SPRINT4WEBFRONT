import { useCallback, useEffect, useState } from 'react'

// Lógica do slideshow da Sprint 2 (antes manipulava o DOM) agora isolada em um hook.
export function useSlideshow(length, { interval = 5000 } = {}) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setIndex((i) => (i + 1) % length), [length])
  const prev = useCallback(() => setIndex((i) => (i - 1 + length) % length), [length])
  const goTo = useCallback((i) => setIndex(i), [])
  const togglePause = useCallback(() => setPaused((p) => !p), [])

  useEffect(() => {
    if (paused || length < 2) return
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [paused, next, interval, length, index])

  return { index, paused, next, prev, goTo, togglePause }
}
