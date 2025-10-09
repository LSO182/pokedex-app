import { defineStore } from 'pinia'
import Fuse from 'fuse.js'
import type { PokemonListItem } from '@/types/pokemon'

const LS_KEY = 'myFavouritesPokemons'

function loadFromStorage(): PokemonListItem[] {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed as PokemonListItem[]
    return []
  } catch {
    return []
  }
}

function saveToStorage(items: PokemonListItem[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(items))
  } catch {
    // ignore quota errors
  }
}

interface State {
  items: PokemonListItem[]
  searchTerm: string
}

export const useFavouritesStore = defineStore('favourites', {
  state: (): State => ({
    items: loadFromStorage(),
    searchTerm: '',
  }),
  getters: {
    isFavourite: (state) => (name: string) =>
      state.items.some((i) => i.name.toLowerCase() === name.toLowerCase()),
    filteredFavouritePokemons(state): PokemonListItem[] {
      const q = state.searchTerm.trim()
      if (!q) {
        // Return items sorted alphabetically by name when there's no query
        return [...state.items].sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
        )
      }
      const fuse = new Fuse(state.items, {
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
    add(item: PokemonListItem) {
      if (this.isFavourite(item.name)) return
      this.items.push({ name: item.name, url: item.url })
      saveToStorage(this.items)
    },
    removeByName(name: string) {
      this.items = this.items.filter((i) => i.name.toLowerCase() !== name.toLowerCase())
      saveToStorage(this.items)
    },
    toggle(item: PokemonListItem) {
      if (this.isFavourite(item.name)) {
        this.removeByName(item.name)
      } else {
        this.add(item)
      }
    },
    clearAll() {
      this.items = []
      saveToStorage(this.items)
    },
  },
})
