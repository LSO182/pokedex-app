import { get } from './apiClient'
import type { PokemonListResponse } from '@/types/pokemon'

export async function fetchAllPokemon(): Promise<PokemonListResponse> {
  return await get<PokemonListResponse>('pokemon', { limit: 100000, offset: 0 })
}
