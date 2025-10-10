import { get } from './apiClient'
import type { PokemonListResponse, PokemonDetail } from '@/types/pokemon'

/**
 * Fetch the complete list (capped) of Pokémon entries.
 *
 * Notes:
 * - Uses a pragmatic `limit=2000` to keep payload sizes reasonable for this project.
 * - Each result contains a `name` and a `url` to fetch its detail.
 *
 * @returns Full list response including `results`, `count`, and pagination fields.
 */
export async function fetchAllPokemon(): Promise<PokemonListResponse> {
  return await get<PokemonListResponse>('pokemon', { limit: 2000, offset: 0 })
}

/**
 * Fetch detailed information for a single Pokémon.
 *
 * - Accepts either a numeric/id-or-name identifier (relative lookup) or an absolute URL.
 * - When an absolute URL is provided, it is requested directly via `fetch`.
 *
 * @param identifierOrUrl Numeric id, name, or absolute URL returned by the list endpoint.
 * @returns The Pokémon detail payload including `id`, `name`, `types`, and `sprites`.
 * @throws Error when the underlying request fails or returns non-2xx status.
 */
export async function fetchPokemonDetail(identifierOrUrl: string): Promise<PokemonDetail> {
  const isAbsolute = /^https?:\/\//i.test(identifierOrUrl)
  if (isAbsolute) {
    const res = await fetch(identifierOrUrl)
    if (!res.ok) throw new Error(`GET ${identifierOrUrl} failed: ${res.status}`)
    return (await res.json()) as PokemonDetail
  }
  return await get<PokemonDetail>(`pokemon/${identifierOrUrl}`)
}
