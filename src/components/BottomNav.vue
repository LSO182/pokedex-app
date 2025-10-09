<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'

const route = useRoute()
const isAll = () => route.name === 'pokemons'
const isFav = () => route.name === 'favourites-pokemons'
</script>

<template>
  <nav class="bottom-nav" role="navigation" aria-label="Primary navigation">
    <div class="bottom-nav__inner">
      <RouterLink :to="{ name: 'pokemons' }" aria-current="isAll() ? 'page' : undefined">
        <BaseButton :variant="isAll() ? 'primary' : 'secondary'" as="a">
          <span class="btn-content">
            <span class="bottom-nav__icon">
              <img src="/src/assets/images/list-icon-btn.png" alt="All" width="18" height="18" />
            </span>
            <span>All</span>
          </span>
        </BaseButton>
      </RouterLink>

      <RouterLink :to="{ name: 'favourites-pokemons' }" aria-current="isFav() ? 'page' : undefined">
        <BaseButton :variant="isFav() ? 'primary' : 'secondary'" as="a">
          <span class="btn-content">
            <span class="bottom-nav__icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 26 26" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6052 0.904438L8.43178 7.62704L1.33161 8.70855C0.0580367 8.90693 -0.45171 10.4903 0.475296 11.4291L5.62249 16.6662L4.40512 23.8453C4.18612 25.1375 5.51379 26.1041 6.61923 25.4782L13 21.8844L19.3808 25.4782C20.4862 26.1039 21.8139 25.1375 21.5949 23.8453L20.3775 16.6662L25.5247 11.4291C26.4517 10.4903 25.942 8.90693 24.6684 8.70855L17.5682 7.62704L14.3948 0.904438C13.8213 -0.309084 12.1787 -0.309084 11.6052 0.904438Z" />
              </svg>
            </span>
            <span>Favorites</span>
          </span>
        </BaseButton>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped></style>
