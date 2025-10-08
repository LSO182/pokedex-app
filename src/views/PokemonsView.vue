<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon'
import { onMounted, ref, computed } from 'vue'
import LoadingView from './LoadingView.vue'
import PokemonCard from '@/components/PokemonCard.vue'
import SearchInput from '@/components/ui/SearchInput.vue'

const store = usePokemonStore()
const { pokemons, loading, error } = storeToRefs(store)

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
          <div v-else>
            <div class="d-flex flex-column align-items-center justify-content-center">
              <SearchInput />
              <div v-for="pokemon in pokemons" :key="pokemon.name">
                <PokemonCard :name="pokemon.name" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
