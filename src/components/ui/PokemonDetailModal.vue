<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import Modal from 'bootstrap/js/dist/modal'
import { fetchPokemonDetail } from '@/services/pokemon.service'
import type { PokemonDetail } from '@/types/pokemon'
import FavButton from '@/components/ui/FavButton.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseToast from '@/components/ui/BaseToast.vue'
import { useTransientToast } from '@/composables/useToast'
import { useFavouritesStore } from '@/stores/favourites'

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

const favourites = useFavouritesStore()
const currentName = computed(() => detail.value?.name ?? props.identifier ?? '')
const currentUrl = computed(
  () => props.url ?? (detail.value ? `https://pokeapi.co/api/v2/pokemon/${detail.value.id}/` : ''),
)
const isFav = computed(() =>
  currentName.value
    ? favourites.items.some((i) => i.name.toLowerCase() === currentName.value.toLowerCase())
    : false,
)
function toggleFav() {
  if (!currentName.value) return
  favourites.toggle({ name: currentName.value, url: currentUrl.value })
}

const shareLabel = ref('Share to my friends')
const srAnnounce = ref('')
const { visible: toastVisible, message: toastMessage, showToast } = useTransientToast(1800)

async function share() {
  const d = detail.value
  const name = currentName.value
  const types = d?.types?.map((t) => t.type.name).join(' / ')
  const parts = [name, d?.weight?.toString(), d?.height?.toString(), types].filter(
    (x): x is string => Boolean(x),
  )
  const text = parts.join(', ')
  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(text)
    } else {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.focus()
      ta.select()
      try {
        document.execCommand('copy')
      } finally {
        document.body.removeChild(ta)
      }
    }
    showToast('Copied details to clipboard')
    srAnnounce.value = 'Copied to clipboard'
    setTimeout(() => (srAnnounce.value = ''), 1500)
  } catch (e) {
    showToast('Failed to copy to clipboard')
  }
}

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
            <div class="pokedex-image position-relative">
              <div class="position-absolute right-0">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  <img src="/src/assets/images/btn-close-icon.png" alt="Close" />
                </button>
              </div>
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
                alt="Pokémon image"
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
              <div
                class="d-flex align-items-center justify-content-center justify-content-lg-between pt-20 px-lg-30"
              >
                <BaseButton variant="primary" @click="share" class="btn-195 me-3 me-lg-0">{{
                  shareLabel
                }}</BaseButton>
                <FavButton :pressed="isFav" @click="toggleFav" />
                <span class="visually-hidden" aria-live="polite">{{ srAnnounce }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
  <BaseToast v-model="toastVisible" :message="toastMessage" variant="success" />
</template>

<style scoped>
.detail-container p {
  padding: 10px 0;
}
.detail-container {
  border-bottom: 1px solid var(--tertiary-grey);
  margin: 0 30px;
}
.right-0 {
  right: 0;
}
@media (min-width: 992px) {
  .px-lg-30 {
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>
