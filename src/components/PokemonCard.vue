<script setup lang="ts">
import FavButton from '@/components/ui/FavButton.vue'

defineProps<{ name: string }>()
</script>

<template>
  <div class="pokemon-card bg-white rounded d-flex align-items-center justify-content-between">
    <p class="h4 text-primary-black text-capitalize mb-0">{{ name }}</p>
    <div class="card-btn-fav">
      <FavButton />
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
