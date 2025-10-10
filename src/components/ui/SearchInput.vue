<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const value = computed({
  get: () => props.modelValue ?? '',
  set: (v: string) => emit('update:modelValue', v),
})
</script>

<template>
  <div class="search-input position-relative">
    <input
      type="search"
      class="form-control"
      v-model="value"
      :placeholder="placeholder ?? 'Search'"
      aria-label="Search"
    />
  </div>
</template>
