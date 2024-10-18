import { ref } from 'vue'

export function useCycle<T>(options: Array<T>) {
  const value = ref(options[0])
  const index = ref(0)

  const next = () => {
    ++index.value

    value.value = options[index.value % options.length]
  }

  return [value, next] as const
}
