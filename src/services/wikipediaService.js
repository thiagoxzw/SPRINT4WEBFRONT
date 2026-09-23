// API pública de terceiros: busca da Wikipédia em português (MediaWiki Action API).
// O parâmetro origin=* habilita requisições CORS anônimas a partir do navegador.
const ENDPOINT = 'https://pt.wikipedia.org/w/api.php'

const stripHtml = (html) => html.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&')

export async function searchWikipedia(term, { signal, limit = 5 } = {}) {
  const params = new URLSearchParams({
    action: 'query',
    list: 'search',
    srsearch: term,
    srlimit: String(limit),
    format: 'json',
    origin: '*',
  })
  const response = await fetch(`${ENDPOINT}?${params}`, { signal })
  if (!response.ok) throw new Error(`A Wikipédia respondeu com erro ${response.status}.`)
  const data = await response.json()
  return (data.query?.search ?? []).map((page) => ({
    id: page.pageid,
    title: page.title,
    snippet: stripHtml(page.snippet ?? ''),
    url: `https://pt.wikipedia.org/?curid=${page.pageid}`,
  }))
}
