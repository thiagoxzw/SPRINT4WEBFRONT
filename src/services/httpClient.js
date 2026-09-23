import { mockServer } from './mockServer'

// Se VITE_API_URL estiver definida (ex.: projeto do MockAPI), as requisições vão para ela via fetch.
// Caso contrário, são atendidas pela API mockada local.
const API_URL = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, '')

export const apiMode = API_URL ? 'MockAPI' : 'API mockada local'

export async function request(path, { method = 'GET', body } = {}) {
  if (!API_URL) return mockServer(method, path, body)

  const response = await fetch(API_URL + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!response.ok) {
    const error = new Error(`Erro ${response.status} ao acessar a API.`)
    error.status = response.status
    throw error
  }
  return response.json()
}
