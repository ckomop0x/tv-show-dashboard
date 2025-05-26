import { type Ref, watch } from 'vue'

export function useDebounce(
  input: Ref<string>,
  delay: number,
  callback: (value: string) => void
) {
  let timeoutId: number | undefined

  watch(input, (newValue) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback(newValue)
    }, delay)
  })
}
