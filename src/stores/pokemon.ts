import { defineStore } from 'pinia'
import { fetchAllPokemon } from '@/services/pokemon.service'
import type { PokemonListResponse, NamedAPIResource } from '@/types/pokemon'

interface State {
  pokemons: NamedAPIResource[]
  count: number
  next: string | null
  previous: string | null
  loading: boolean
  error: string | null
}

export const usePokemonStore = defineStore('pokemon', {
  state: (): State => ({
    pokemons: [],
    count: 0,
    next: null,
    previous: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchAll() {
      this.loading = true
      this.error = null
      try {
        const data: PokemonListResponse = await fetchAllPokemon()
        this.pokemons = data.results
        this.count = data.count
        this.next = data.next
        this.previous = data.previous
      } catch (err: any) {
        this.error = err?.message ?? 'Failed to fetch pokemons'
      } finally {
        this.loading = false
      }
    },
  },
})
