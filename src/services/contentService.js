import { request } from './httpClient'

const normalize = (row) => ({
  favorite: false,
  deleted: false,
  notes: '',
  ...row,
  id: String(row.id),
})

export const contentService = {
  async list(owner) {
    const rows = await request('/contents')
    return rows.map(normalize).filter((row) => row.owner === owner)
  },
  async get(id) {
    return normalize(await request(`/contents/${id}`))
  },
  async create(data) {
    return normalize(await request('/contents', { method: 'POST', body: data }))
  },
  async update(item) {
    return normalize(await request(`/contents/${item.id}`, { method: 'PUT', body: item }))
  },
  async remove(id) {
    return request(`/contents/${id}`, { method: 'DELETE' })
  },
}
