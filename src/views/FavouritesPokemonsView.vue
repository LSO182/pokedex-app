<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useFavouritesStore } from '@/stores/favourites'
import SearchInput from '@/components/ui/SearchInput.vue'
import PokemonCard from '@/components/PokemonCard.vue'

const fav = useFavouritesStore()
const { filteredFavouritePokemons, searchTerm } = storeToRefs(fav)
</script>

<template>
  <div class="bg-primary-grey min-vh-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10 d-flex flex-column align-items-center justify-content-center">
          <SearchInput v-model="searchTerm" placeholder="Search" class="search-input-py" />
          <div v-for="pokemon in filteredFavouritePokemons" :key="pokemon.name">
            <PokemonCard :name="pokemon.name" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-input-py { padding-top: 35px; padding-bottom: 40px; }
</style>
