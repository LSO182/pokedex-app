<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  message: string
  variant?: 'success' | 'error' | 'info'
}>()

const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>()

const variantClass = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'is-success'
    case 'error':
      return 'is-error'
    default:
      return 'is-info'
  }
})

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <div
    v-if="modelValue"
    class="base-toast"
    :class="variantClass"
    role="status"
    aria-live="polite"
    @click="close"
  >
    {{ message }}
  </div>
</template>

<style scoped>
.base-toast {
  position: fixed;
  right: 20px;
  bottom: 20px;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  padding: 10px 14px;
  border-radius: 8px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  z-index: 1080;
  font-size: 0.95rem;
  cursor: pointer;
  user-select: none;
}
.base-toast.is-success {
  background: rgba(16, 135, 53, 0.9);
}
.base-toast.is-error {
  background: rgba(176, 16, 16, 0.9);
}
.base-toast.is-info {
  background: rgba(0, 0, 0, 0.85);
}
</style>
