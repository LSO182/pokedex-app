import { defineStore } from 'pinia'
import Fuse from 'fuse.js'
import { fetchAllPokemon } from '@/services/pokemon.service'
import type { PokemonListResponse, PokemonListItem } from '@/types/pokemon'

interface State {
  pokemons: PokemonListItem[]
  count: number
  next: string | null
  previous: string | null
  loading: boolean
  error: string | null
  searchTerm: string
}

export const usePokemonStore = defineStore('pokemon', {
  state: (): State => ({
    pokemons: [],
    count: 0,
    next: null,
    previous: null,
    loading: false,
    error: null,
    searchTerm: '',
  }),
  getters: {
    filteredPokemons(state): PokemonListItem[] {
      const q = state.searchTerm.trim()
      if (!q) {
        return [...state.pokemons].sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
        )
      }
      const fuse = new Fuse(state.pokemons, {
        keys: ['name'],
        threshold: 0.3,
        ignoreLocation: true,
        minMatchCharLength: 1,
      })
      return fuse.search(q).map((r) => r.item)
    },
  },
  actions: {
    setSearchTerm(term: string) {
      this.searchTerm = term
    },
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
