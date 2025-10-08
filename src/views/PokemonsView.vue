<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon'
import { onMounted, ref, computed } from 'vue'
import LoadingView from './LoadingView.vue'
import FavButton from '@/components/ui/FavButton.vue'

const store = usePokemonStore()
const { pokemons, count, loading, error } = storeToRefs(store)

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
  <div class="bg-primary-grey min-vh-100" v-else>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <p v-if="error" class="text-danger">{{ error }}</p>
          <ul v-else class="mt-3">
            <h1 class="text-primary-black h3 fw-bold">Pokemons ({{ count }})</h1>
            <FavButton />
            <li v-for="pokemon in pokemons" :key="pokemon.name">{{ pokemon.name }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  padding: 4px 0;
}
</style>
