<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import { usePokemonStore } from '@/stores/pokemon'
import { useFavouritesStore } from '@/stores/favourites'

const route = useRoute()
const router = useRouter()
const pokemon = usePokemonStore()
const favourites = useFavouritesStore()
const isAll = () => route.name === 'pokemons'
const isFav = () => route.name === 'favourites-pokemons'
const go = (name: 'pokemons' | 'favourites-pokemons') => {
  // Clear filters when switching between tabs
  pokemon.setSearchTerm('')
  favourites.setSearchTerm('')
  if (route.name !== name) router.push({ name })
}
</script>

<template>
  <nav class="bottom-nav" role="navigation" aria-label="Primary navigation">
    <div class="d-flex justify-content-between">
      <BaseButton
        :variant="isAll() ? 'primary' : 'secondary'"
        @click="go('pokemons')"
        class="btn-150"
      >
        <template #icon>
          <img src="/src/assets/images/list-icon-btn.png" alt="All list" width="22" height="22" />
        </template>
        All
      </BaseButton>

      <BaseButton
        :variant="isFav() ? 'primary' : 'secondary'"
        @click="go('favourites-pokemons')"
        class="btn-150"
      >
        <template #icon>
          <img
            src="/src/assets/images/star-icon-btn.png"
            alt="Favourites list"
            width="22"
            height="22"
          />
        </template>
        Favorites
      </BaseButton>
    </div>
  </nav>
</template>

<style scoped>
.btn-icon img {
  margin-right: 10px;
}
</style>
