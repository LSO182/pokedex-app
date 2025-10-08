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

<style scoped>
.search-input {
  padding-top: 35px;
  padding-bottom: 40px;
}

.search-input::before {
  content: '';
  position: absolute;
  left: 15px;
  right: 10px;
  top: 47%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  background: url('/src/assets/images/Vector.png') no-repeat center/contain;
  pointer-events: none;
}

.search-input > input.form-control {
  width: 315px;
  height: 50px;
  padding-left: 42px;
  box-shadow: 0px 2px 10px 0px #0000000a;
  border-radius: 5px;
  border: none;
}
</style>
