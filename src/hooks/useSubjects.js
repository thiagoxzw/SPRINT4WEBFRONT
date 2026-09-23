import { useCallback } from 'react'
import { useAuth } from './useAuth'
import { useLocalStorage } from './useLocalStorage'
import { defaultSubjects } from '../data/features'

export function useSubjects() {
  const { user } = useAuth()
  const [subjects, setSubjects] = useLocalStorage(`jovi_subjects_${user.email}`, defaultSubjects)

  // Retorna uma mensagem de erro ou null em caso de sucesso.
  const addSubject = useCallback(
    (name) => {
      const clean = name.trim()
      if (clean.length < 2) return 'O nome da matéria precisa ter ao menos 2 caracteres.'
      if (subjects.some((s) => s.toLowerCase() === clean.toLowerCase())) return 'Essa matéria já existe.'
      setSubjects((prev) => [...prev, clean])
      return null
    },
    [subjects, setSubjects],
  )

  return { subjects, addSubject }
}
