/**
 * Base API endpoint used by the Pokédex data client.
 * All relative paths passed to the client will be resolved against this URL.
 */
const BASE_URL = 'https://pokeapi.co/api/v2/'

/**
 * Represents simple query string parameters accepted by the API client.
 */
export type Query = Record<string, string | number | boolean | undefined>

/**
 * Build a fully-qualified request URL for the given `path` and optional query params.
 *
 * - If `path` contains leading slashes, they are trimmed.
 * - Provided `query` entries with `undefined` are skipped.
 *
 * @param path Relative API path (e.g. `pokemon/25`).
 * @param query Optional query parameters to append.
 * @returns Absolute URL string pointing to the API resource.
 */
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

/**
 * Perform a GET request against the API, parsing the JSON response as `<T>`.
 *
 * @typeParam T - Expected JSON shape of the response body.
 * @param path Relative API path (e.g. `pokemon?limit=20`).
 * @param query Optional query parameters; merged into the final URL.
 * @param init Optional fetch init overrides (headers, signal, etc.).
 * @returns Parsed JSON payload typed as `<T>`.
 * @throws Error when the response has a non-2xx status (includes status and body text when available).
 */
export async function get<T>(path: string, query?: Query, init?: RequestInit): Promise<T> {
  const url = buildUrl(path, query)
  const res = await fetch(url, { method: 'GET', ...init })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`GET ${url} failed: ${res.status} ${res.statusText} ${text}`)
  }
  return (await res.json()) as T
}
