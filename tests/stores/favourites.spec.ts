import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useFavouritesStore } from '@/stores/favourites'

describe('favourites store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // isolate localStorage usage
    localStorage.clear()
  })

  it('adds and removes favourites via toggle()', () => {
    const fav = useFavouritesStore()
    const pikachu = { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }

    expect(fav.isFavourite(pikachu.name)).toBe(false)
    fav.toggle(pikachu)
    expect(fav.isFavourite(pikachu.name)).toBe(true)
    fav.toggle(pikachu)
    expect(fav.isFavourite(pikachu.name)).toBe(false)
  })
})

