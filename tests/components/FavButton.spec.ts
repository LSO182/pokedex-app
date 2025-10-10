import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import FavButton from '@/components/ui/FavButton.vue'

describe('FavButton', () => {
  it('reflects pressed state via aria-pressed', () => {
    const w1 = mount(FavButton, { props: { pressed: true } })
    expect(w1.attributes('aria-pressed')).toBe('true')
    const w2 = mount(FavButton, { props: { pressed: false } })
    expect(w2.attributes('aria-pressed')).toBe('false')
  })

  it('emits click and stops propagation', async () => {
    const wrapper = mount(FavButton)
    const stop = vi.fn()
    await wrapper.trigger('click', { stopPropagation: stop })
    // component calls ev.stopPropagation(); then emits
    expect(stop).toHaveBeenCalled()
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})

