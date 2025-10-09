import { createRouter, createWebHistory } from 'vue-router'

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

export default router
