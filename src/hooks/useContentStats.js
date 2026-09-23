import { useMemo } from 'react'

// Indicadores do painel. Usa Math.round() e Math.min() (requisito mantido desde a Sprint 3).
export function useContentStats(active, trash, subjects) {
  return useMemo(() => {
    const total = active.length
    const favorites = active.filter((i) => i.favorite).length
    const withNotes = active.filter((i) => i.notes?.trim()).length
    const usedSubjects = new Set(active.map((i) => i.subject)).size
    const organization = total
      ? Math.round(Math.min(100, (usedSubjects / Math.max(subjects.length, 1)) * 50 + (withNotes / total) * 30 + (favorites / total) * 20))
      : 0
    return { total, favorites, withNotes, trashed: trash.length, subjects: subjects.length, organization }
  }, [active, trash, subjects])
}
