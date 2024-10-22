<template>
  <number-flow :data-will-change="willChange ? '' : undefined">
    <span :style="slottedStyles({ willChange: true })">
      {{ parts.formatted }}
    </span>
  </number-flow>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, nextTick, ref, watch } from 'vue'

import {
  partitionParts,
  slottedStyles,
  type Format,
  type Trend,
} from 'number-flow'

import { omit } from '@/utils'

interface Props {
  value: number
  format?: Format
  locales?: Intl.LocalesArgument
  isolate?: boolean
  animated?: boolean
  respectMotionPreference?: boolean
  willChange?: boolean
  trend?: Trend
  onAnimationsStart?: () => void
  onAnimationsFinish?: () => void
  opacityTiming?: EffectTiming
  transformTiming?: EffectTiming
  spinTiming?: EffectTiming
}

const props = withDefaults(defineProps<Props>(), {
  isolate: false,
  animated: true,
  respectMotionPreference: true,
  willChange: false,
  trend: true,
})

const parts = ref(
  partitionParts(props.value, Intl.NumberFormat(props.locales, props.format)),
)

const instance = getCurrentInstance()
const rootEl = computed(() => instance?.proxy?.$el)

watch(
  () => props.value,
  async () => {
    parts.value = partitionParts(
      props.value,
      Intl.NumberFormat(props.locales, props.format),
    )

    if (rootEl.value) {
      rootEl.value.setAttribute('parts', JSON.stringify(parts.value))
      rootEl.value.willUpdate()

      await nextTick()

      rootEl.value.didUpdate()
    }
  },
  { immediate: true },
)

watch(
  () => omit(props, 'value'),
  async (newProps, prevProps) => {
    await nextTick()

    if (!rootEl.value) return

    rootEl.value.animated = newProps.animated
    rootEl.value.respectMotionPreference = newProps.respectMotionPreference
    rootEl.value.trend = newProps.trend
    rootEl.value.isolate = newProps.isolate
    if (newProps.opacityTiming)
      rootEl.value.opacityTiming = newProps.opacityTiming
    if (newProps.transformTiming)
      rootEl.value.transformTiming = newProps.transformTiming
    if (newProps.spinTiming) rootEl.value.spinTiming = newProps.spinTiming

    if (prevProps?.onAnimationsStart) {
      rootEl.value.removeEventListener(
        'animationsstart',
        prevProps.onAnimationsStart,
      )
    }

    if (newProps.onAnimationsStart) {
      rootEl.value.addEventListener(
        'animationsstart',
        newProps.onAnimationsStart,
      )
    }

    if (prevProps?.onAnimationsFinish) {
      rootEl.value.removeEventListener(
        'animationsfinish',
        prevProps.onAnimationsFinish,
      )
    }

    if (newProps.onAnimationsFinish) {
      rootEl.value.addEventListener(
        'animationsfinish',
        newProps.onAnimationsFinish,
      )
    }
  },
  {
    immediate: true,
    deep: true,
  },
)
</script>
