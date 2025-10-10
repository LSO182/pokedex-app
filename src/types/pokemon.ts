export interface NamedAPIResource {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: NamedAPIResource[]
}

// Local alias for readability in app code
export type PokemonListItem = NamedAPIResource

export interface PokemonDetailTypeEntry {
  slot: number
  type: NamedAPIResource
}

export interface PokemonSpritesOtherEntry {
  front_default: string | null
}

export interface PokemonSpritesOther {
  home?: PokemonSpritesOtherEntry
  dream_world?: PokemonSpritesOtherEntry
  ['official-artwork']?: PokemonSpritesOtherEntry
}

export interface PokemonSprites {
  front_default: string | null
  other?: PokemonSpritesOther
}

export interface PokemonDetail {
  id: number
  name: string
  height: number
  weight: number
  types: PokemonDetailTypeEntry[]
  sprites: PokemonSprites
}
