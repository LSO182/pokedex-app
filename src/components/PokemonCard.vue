<script setup lang="ts">
import FavButton from '@/components/ui/FavButton.vue'
import { computed } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'
import { useFavouritesStore } from '@/stores/favourites'
import type { PokemonListItem } from '@/types/pokemon'

const props = defineProps<{ name: string }>()

const pokemonStore = usePokemonStore()
const favourites = useFavouritesStore()

const item = computed<PokemonListItem>(() => {
  const found = pokemonStore.pokemons.find((p) => p.name === props.name)
  return found ?? { name: props.name, url: '' }
})

const isFav = computed(() => favourites.isFavourite(props.name))

function setFavouritePokemon() {
  favourites.toggle(item.value)
}
</script>

<template>
  <div class="pokemon-card bg-white rounded d-flex align-items-center justify-content-between">
    <p class="h4 text-primary-black text-capitalize mb-0">{{ name }}</p>
    <div class="card-btn-fav">
      <FavButton :aria-pressed="isFav" @click="setFavouritePokemon" />
    </div>
  </div>
</template>

<style scoped>
.pokemon-card {
  width: 315px;
  margin-bottom: 10px;
}
.pokemon-card p {
  padding: 17px 20px;
}
.card-btn-fav {
  padding-right: 10px;
}
</style>
