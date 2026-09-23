// API REST mockada que roda no próprio navegador.
// Imita o comportamento do MockAPI (GET/POST/PUT/DELETE em /contents) com atraso de rede
// simulado e persistência no localStorage, para que o projeto funcione sem back-end.
const STORAGE_KEY = 'jovi_api_contents'

const daysAgo = (n) => new Date(Date.now() - n * 86_400_000).toISOString()

const seed = () => [
  { id: '1', title: 'Limites e Continuidade', subject: 'Cálculo', type: 'Foto + OCR', favorite: true, deleted: false, notes: 'Revisar o teorema do confronto antes da prova.', owner: 'aluno@fiap.com.br', createdAt: daysAgo(0) },
  { id: '2', title: 'Leis de Newton', subject: 'Física', type: 'Foto', favorite: false, deleted: false, notes: '', owner: 'aluno@fiap.com.br', createdAt: daysAgo(1) },
  { id: '3', title: 'Componentes React', subject: 'Programação', type: 'OCR', favorite: true, deleted: false, notes: 'Props descem, eventos sobem.', owner: 'aluno@fiap.com.br', createdAt: daysAgo(0) },
  { id: '4', title: 'Banco de Dados', subject: 'Engenharia de Software', type: 'Foto', favorite: false, deleted: false, notes: '', owner: 'aluno@fiap.com.br', createdAt: daysAgo(2) },
  { id: '5', title: 'Plano de aula — Derivadas', subject: 'Cálculo', type: 'OCR', favorite: false, deleted: false, notes: '', owner: 'professor@fiap.com.br', createdAt: daysAgo(3) },
]

const readDb = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (Array.isArray(saved)) return saved
  } catch {
    // dado corrompido: recria a base inicial
  }
  const initial = seed()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
  return initial
}

const writeDb = (rows) => localStorage.setItem(STORAGE_KEY, JSON.stringify(rows))

const delay = () => new Promise((resolve) => setTimeout(resolve, 250 + Math.round(Math.random() * 350)))

const notFound = () => {
  const error = new Error('Recurso não encontrado (404).')
  error.status = 404
  return error
}

export async function mockServer(method, path, body) {
  await delay()
  const [, resource, id] = path.split('?')[0].split('/')
  if (resource !== 'contents') throw notFound()

  const rows = readDb()

  if (method === 'GET' && !id) return rows
  if (method === 'GET') {
    const row = rows.find((r) => r.id === id)
    if (!row) throw notFound()
    return row
  }
  if (method === 'POST') {
    const nextId = String(rows.reduce((max, r) => Math.max(max, Number(r.id) || 0), 0) + 1)
    const row = { ...body, id: nextId }
    writeDb([...rows, row])
    return row
  }
  if (method === 'PUT') {
    const current = rows.find((r) => r.id === id)
    if (!current) throw notFound()
    const row = { ...current, ...body, id }
    writeDb(rows.map((r) => (r.id === id ? row : r)))
    return row
  }
  if (method === 'DELETE') {
    const current = rows.find((r) => r.id === id)
    if (!current) throw notFound()
    writeDb(rows.filter((r) => r.id !== id))
    return current
  }
  throw notFound()
}
