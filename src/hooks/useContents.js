import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from './useAuth'
import { useDebounce } from './useDebounce'
import { useLocalStorage } from './useLocalStorage'
import { contentService } from '../services/contentService'

const byNewest = (a, b) => new Date(b.createdAt) - new Date(a.createdAt)

// Toda a regra de negócio da Central de Conteúdo: carregamento via API, CRUD, lixeira, filtros e histórico.
export function useContents() {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)
  const [busyId, setBusyId] = useState(null)
  const [query, setQuery] = useState('')
  const [subject, setSubject] = useState('Todas')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [history, setHistory] = useLocalStorage(`jovi_history_${user.email}`, [])
  const debouncedQuery = useDebounce(query, 250)

  const log = useCallback(
    (action, title) =>
      setHistory((prev) => [{ id: crypto.randomUUID(), action, title, at: new Date().toISOString() }, ...prev].slice(0, 30)),
    [setHistory],
  )

  const load = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      setItems(await contentService.list(user.email))
      setStatus('ready')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }, [user.email])

  useEffect(() => {
    load()
  }, [load])

  const run = useCallback(async (id, task) => {
    setBusyId(id)
    setError(null)
    try {
      return await task()
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setBusyId(null)
    }
  }, [])

  const replace = (updated) => setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)))

  const add = useCallback(
    ({ title, subject: itemSubject, type }) =>
      run('new', async () => {
        const created = await contentService.create({
          title: title.trim(),
          subject: itemSubject,
          type,
          favorite: false,
          deleted: false,
          notes: '',
          owner: user.email,
          createdAt: new Date().toISOString(),
        })
        setItems((prev) => [created, ...prev])
        log('Adicionado', created.title)
        return created
      }),
    [run, user.email, log],
  )

  const update = useCallback(
    (item, changes, action) =>
      run(item.id, async () => {
        const updated = await contentService.update({ ...item, ...changes })
        replace(updated)
        log(action, updated.title)
        return updated
      }),
    [run, log],
  )

  const toggleFavorite = useCallback(
    (item) => update(item, { favorite: !item.favorite }, item.favorite ? 'Desfavoritado' : 'Favoritado'),
    [update],
  )
  const moveToTrash = useCallback((item) => update(item, { deleted: true }, 'Movido para a lixeira'), [update])
  const restore = useCallback((item) => update(item, { deleted: false }, 'Restaurado'), [update])

  const destroy = useCallback(
    (item) =>
      run(item.id, async () => {
        await contentService.remove(item.id)
        setItems((prev) => prev.filter((i) => i.id !== item.id))
        log('Excluído definitivamente', item.title)
        return true
      }),
    [run, log],
  )

  const active = useMemo(() => items.filter((i) => !i.deleted).sort(byNewest), [items])
  const trash = useMemo(() => items.filter((i) => i.deleted).sort(byNewest), [items])

  const filtered = useMemo(() => {
    const term = debouncedQuery.trim().toLowerCase()
    return active.filter(
      (i) =>
        (subject === 'Todas' || i.subject === subject) &&
        (!onlyFavorites || i.favorite) &&
        `${i.title} ${i.subject} ${i.type} ${i.notes}`.toLowerCase().includes(term),
    )
  }, [active, debouncedQuery, subject, onlyFavorites])

  const clearHistory = useCallback(() => setHistory([]), [setHistory])

  return {
    status,
    error,
    busyId,
    active,
    trash,
    filtered,
    history,
    filters: { query, subject, onlyFavorites },
    setQuery,
    setSubject,
    setOnlyFavorites,
    reload: load,
    add,
    toggleFavorite,
    moveToTrash,
    restore,
    destroy,
    clearHistory,
  }
}
