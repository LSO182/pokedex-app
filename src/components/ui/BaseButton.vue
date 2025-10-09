<script setup lang="ts">
import { computed } from 'vue'
defineOptions({ inheritAttrs: false })

type ButtonVariant = 'primary' | 'secondary'

const props = defineProps<{
  variant?: ButtonVariant
  block?: boolean
  disabled?: boolean
  loading?: boolean
  as?: 'button' | 'a'
  type?: 'button' | 'submit' | 'reset'
  href?: string
}>()

const tag = computed(() => props.as ?? 'button')
const variant = computed(() => props.variant ?? 'primary')

const cls = computed(() => [
  'btn',
  `btn-${variant.value}`,
  props.block ? 'w-100' : null,
  props.loading ? 'disabled' : null,
])
</script>

<template>
  <component
    :is="tag"
    :class="cls"
    :disabled="tag === 'button' ? disabled || loading : undefined"
    :href="tag === 'a' ? href : undefined"
    :type="tag === 'button' ? (type ?? 'button') : undefined"
    v-bind="$attrs"
  >
    <span class="btn-content">
      <span v-if="$slots.icon" class="btn-icon"><slot name="icon" /></span>
      <span v-if="$slots.default" class="btn-label"><slot /></span>
    </span>
  </component>
</template>
