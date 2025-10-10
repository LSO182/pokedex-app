import { createRouter, createWebHistory } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemon'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('../views/WelcomeToPokedexView.vue'),
    },
    {
      path: '/pokemons',
      name: 'pokemons',
      component: () => import('../views/PokemonsView.vue'),
    },
    {
      path: '/favourites-pokemons',
      name: 'favourites-pokemons',
      component: () => import('../views/FavouritesPokemonsView.vue'),
    },
  ],
})

// navigating to /pokemons without data, fetch pokemons and proceed
router.beforeEach(async (to) => {
  if (to.name === 'pokemons') {
    const store = usePokemonStore()
    const hasData = store.pokemons && store.pokemons.length > 0
    if (!hasData && !store.loading) {
      try {
        await store.fetchAll()
      } catch {
        // ignore; view will show error state if needed
      }
    }
  }
})

export default router
