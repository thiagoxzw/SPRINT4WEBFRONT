import { useEffect } from 'react'

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | JOVI Modo Aula` : 'JOVI Modo Aula — NextStage'
  }, [title])
}
