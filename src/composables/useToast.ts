import { ref } from 'vue'

export function useTransientToast(defaultDuration = 1800) {
  const visible = ref(false)
  const message = ref('')
  let timer: number | undefined

  function showToast(msg: string, duration?: number) {
    message.value = msg
    visible.value = true
    if (timer) window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      visible.value = false
      message.value = ''
      timer = undefined
    }, duration ?? defaultDuration)
  }

  return { visible, message, showToast }
}

