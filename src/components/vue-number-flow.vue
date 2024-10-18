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
  NumberFlowLite,
  type Format,
  type Trend,
} from 'number-flow'

const OBSERVED_ATTRIBUTES = ['parts']

class NumberFlowElement extends NumberFlowLite {
  static get observedAttributes() {
    return OBSERVED_ATTRIBUTES
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  attributeChangedCallback(attr, _oldValue, newValue) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this[attr] = JSON.parse(newValue)
  }
}

NumberFlowElement.define()

interface Props {
  value: number
  format?: Format
  locales?: Intl.LocalesArgument
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
  props,
  async (newProps, prevProps) => {
    await nextTick()

    if (!rootEl.value) return

    rootEl.value.animated = props.animated
    rootEl.value.respectMotionPreference = props.respectMotionPreference
    rootEl.value.trend = props.trend
    if (props.opacityTiming) rootEl.value.opacityTiming = props.opacityTiming
    if (props.transformTiming)
      rootEl.value.transformTiming = props.transformTiming
    if (props.spinTiming) rootEl.value.spinTiming = props.spinTiming

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
