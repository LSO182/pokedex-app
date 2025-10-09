<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon'
import { onMounted, ref, computed } from 'vue'
import LoadingView from './LoadingView.vue'
import NotPokemonFound from './NotPokemonFound.vue'
import PokemonCard from '@/components/PokemonCard.vue'
import SearchInput from '@/components/ui/SearchInput.vue'

const store = usePokemonStore()
const { pokemons, loading, error, searchTerm, filteredPokemons } = storeToRefs(store)

const minDelayPassed = ref(false)
onMounted(() => {
  setTimeout(() => (minDelayPassed.value = true), 3000)
  if (!loading.value && pokemons.value.length === 0) {
    store.fetchAll()
  }
})

const showLoading = computed(() => loading.value || !minDelayPassed.value)
</script>

<template>
  <LoadingView v-if="showLoading" />
  <div class="bg-primary-grey min-vh-100 pb-bottom-nav" v-else>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <p v-if="error" class="text-danger">{{ error }}</p>
          <div v-else>
            <div class="d-flex flex-column align-items-center justify-content-center">
              <SearchInput v-model="searchTerm" placeholder="Search" class="search-input-py" />
              <NotPokemonFound v-if="searchTerm && filteredPokemons.length === 0" />
              <template v-else>
                <div v-for="pokemon in filteredPokemons" :key="pokemon.name">
                  <PokemonCard :name="pokemon.name" />
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-input-py {
  padding-top: 35px;
  padding-bottom: 40px;
}
</style>
