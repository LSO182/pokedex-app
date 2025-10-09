<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import Modal from 'bootstrap/js/dist/modal'
import { fetchPokemonDetail } from '@/services/pokemon.service'
import type { PokemonDetail } from '@/types/pokemon'

const props = defineProps<{
  modelValue: boolean
  identifier?: string
  url?: string
}>()

const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>()

const modalEl = ref<HTMLDivElement | null>(null)
let instance: Modal | null = null
const loading = ref(false)
const error = ref<string | null>(null)
const detail = ref<PokemonDetail | null>(null)

function show() {
  if (instance) instance.show()
}
function hide() {
  if (instance) instance.hide()
}

async function ensureLoaded() {
  if (detail.value) return
  const key = props.url ?? props.identifier
  if (!key) return
  try {
    loading.value = true
    error.value = null
    detail.value = await fetchPokemonDetail(key)
  } catch (e: any) {
    error.value = e?.message ?? 'Failed to load details'
  } finally {
    loading.value = false
  }
}

watch(
  () => props.modelValue,
  async (v) => {
    if (!instance) return
    if (v) {
      await ensureLoaded()
      show()
    } else {
      hide()
    }
  },
)

onMounted(() => {
  if (modalEl.value) {
    instance = new Modal(modalEl.value, { backdrop: true, focus: true })
    modalEl.value.addEventListener('hidden.bs.modal', () => emit('update:modelValue', false))
    if (props.modelValue) {
      Promise.resolve().then(ensureLoaded).then(show)
    }
  }
})

onBeforeUnmount(() => {
  if (instance && (instance as any).dispose) (instance as any).dispose()
  instance = null
})
</script>

<template>
  <div class="modal fade" ref="modalEl" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered justify-content-center">
      <div class="modal-content">
        <div class="modal-body text-center p-0">
          <div v-if="loading">Loading…</div>
          <div v-else-if="error" class="text-danger">{{ error }}</div>
          <template v-else>
            <div class="pokedex-image">
              <img
                v-if="
                  detail &&
                  (detail.sprites.other?.['official-artwork']?.front_default ||
                    detail.sprites.other?.home?.front_default)
                "
                :src="
                  detail.sprites.other?.['official-artwork']?.front_default ??
                  detail.sprites.other?.home?.front_default!
                "
                alt="Pokemon image"
                class="pokemon-image"
              />
            </div>
            <div class="text-start">
              <div class="detail-container pt-20" v-if="detail">
                <p class="text-secondary-grey text-capitalize mb-0 lh-150 h5">
                  <span class="fw-bold">Name:</span> {{ detail?.name }}
                </p>
              </div>
              <div class="detail-container" v-if="detail">
                <p class="text-secondary-grey text-capitalize mb-0 lh-150 h5">
                  <span class="fw-bold">Weight:</span> {{ detail!.weight }}
                </p>
              </div>
              <div class="detail-container" v-if="detail">
                <p class="text-secondary-grey text-capitalize mb-0 lh-150 h5">
                  <span class="fw-bold">Height:</span> {{ detail!.height }}
                </p>
              </div>
              <div class="detail-container" v-if="detail">
                <p class="text-secondary-grey text-capitalize mb-0 lh-150 h5">
                  <span class="fw-bold">Type:</span>
                  {{ detail!.types.map((t) => t.type.name).join(', ') }}
                </p>
              </div>
              <div class="modal-buttons"></div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-container p {
  padding: 10px 0;
}
.detail-container {
  border-bottom: 1px solid var(--tertiary-grey);
  margin: 0 30px;
}
</style>
