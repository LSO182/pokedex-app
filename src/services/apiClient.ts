const BASE_URL = 'https://pokeapi.co/api/v2/'

export type Query = Record<string, string | number | boolean | undefined>

function buildUrl(path: string, query?: Query): string {
  const normalized = path.replace(/^\/+/, '')
  const url = new URL(normalized, BASE_URL)
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined) url.searchParams.set(k, String(v))
    })
  }
  return url.toString()
}

export async function get<T>(path: string, query?: Query, init?: RequestInit): Promise<T> {
  const url = buildUrl(path, query)
  const res = await fetch(url, { method: 'GET', ...init })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`GET ${url} failed: ${res.status} ${res.statusText} ${text}`)
  }
  return (await res.json()) as T
}
