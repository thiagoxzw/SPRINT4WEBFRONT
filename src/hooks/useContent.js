import { useCallback, useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import { contentService } from '../services/contentService'

// Carrega um único conteúdo pelo id da rota e permite salvar alterações (anotações, matéria etc.).
export function useContent(id) {
  const { user } = useAuth()
  const [item, setItem] = useState(null)
  const [status, setStatus] = useState('loading')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false
    setStatus('loading')
    contentService
      .get(id)
      .then((row) => {
        if (ignore) return
        if (row.owner !== user.email) {
          setStatus('not-found')
          return
        }
        setItem(row)
        setStatus('ready')
      })
      .catch((err) => {
        if (ignore) return
        setStatus(err.status === 404 ? 'not-found' : 'error')
        setError(err.message)
      })
    return () => {
      ignore = true
    }
  }, [id, user.email])

  const save = useCallback(
    async (changes) => {
      setSaving(true)
      setError(null)
      try {
        const updated = await contentService.update({ ...item, ...changes })
        setItem(updated)
        return true
      } catch (err) {
        setError(err.message)
        return false
      } finally {
        setSaving(false)
      }
    },
    [item],
  )

  return { item, status, saving, error, save }
}
