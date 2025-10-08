<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import { usePokemonStore } from '@/stores/pokemon'
import { useRouter } from 'vue-router'

const router = useRouter()
const pokemon = usePokemonStore()

async function onGetStarted() {
  void pokemon.fetchAll()
  router.push({ name: 'pokemons' })
}
</script>

<template>
  <div class="bg-primary-grey min-vh-100 pt-70">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10 d-flex justify-content-center">
          <div class="greet-pika-container position-relative">
            <img
              src="/src/assets/images/pikachu-welcome-img.png"
              class="position-absolute greet-pika"
              alt="Pikachu waving hello"
            />
          </div>
        </div>
        <div class="col-lg-10">
          <h1 class="text-primary-black text-center pt-60 lh-100 h3 fw-bold">Welcome to Pokédex</h1>
          <p class="text-secondary-grey text-center pt-30 lh-150 h5">
            The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in
            the Pokémon world.
          </p>
          <div class="d-flex justify-content-center pt-50">
            <BaseButton variant="primary" @click="onGetStarted"> Get started </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.greet-pika-container {
  width: 206px;
  height: 263px;
  background: url('/src/assets/images/bg-pokeball.png') no-repeat bottom center / contain;
}
.greet-pika {
  object-fit: cover;
  top: -2px;
  left: -43px;
  height: 263px;
}
</style>
