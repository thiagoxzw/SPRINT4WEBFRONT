import { useCallback, useState } from 'react'

export function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  const toggle = useCallback(() => setOn((v) => !v), [])
  const close = useCallback(() => setOn(false), [])
  const open = useCallback(() => setOn(true), [])
  return { on, toggle, open, close }
}
