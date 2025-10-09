import { get } from './apiClient'
import type { PokemonListResponse, PokemonDetail } from '@/types/pokemon'

export async function fetchAllPokemon(): Promise<PokemonListResponse> {
  return await get<PokemonListResponse>('pokemon', { limit: 100000, offset: 0 })
}

export async function fetchPokemonDetail(identifierOrUrl: string): Promise<PokemonDetail> {
  const isAbsolute = /^https?:\/\//i.test(identifierOrUrl)
  if (isAbsolute) {
    const res = await fetch(identifierOrUrl)
    if (!res.ok) throw new Error(`GET ${identifierOrUrl} failed: ${res.status}`)

    return (await res.json()) as PokemonDetail
  }
  return await get<PokemonDetail>(`pokemon/${identifierOrUrl}`)
}
