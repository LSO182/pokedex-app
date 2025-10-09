<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import { usePokemonStore } from '@/stores/pokemon'
import { useFavouritesStore } from '@/stores/favourites'

const pokemon = usePokemonStore()
const favourites = useFavouritesStore()

function onResetSearch() {
  pokemon.setSearchTerm('')
  favourites.setSearchTerm('')
}
</script>

<template>
  <div class="text-center pt-10">
    <p class="text-primary-black h1 mb-0 fw-bold lh-100">Uh-oh!</p>
    <p class="text-secondary-grey lost-py lh-150 mb-0 h5">You look lost on your journey!</p>
    <BaseButton variant="primary" type="reset" @click="onResetSearch"> Go back home </BaseButton>
  </div>
</template>

<style scoped>
.lost-py {
  padding-top: 10px;
  padding-bottom: 25px;
}
</style>
