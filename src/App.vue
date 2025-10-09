<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import BottomNav from '@/components/BottomNav.vue'

const route = useRoute()
const showBottomNav = computed(
  () => route.name === 'pokemons' || route.name === 'favourites-pokemons',
)
</script>

<template>
  <RouterView />
  <BottomNav v-if="showBottomNav" />
</template>
