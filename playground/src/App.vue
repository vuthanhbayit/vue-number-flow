<script lang="ts" setup>
import { VueNumberFlow } from '../../dist'
import type { Format } from 'number-flow'
import { useCycle } from './composables'

const NUMBERS = [
  321, -3243.6, 42, 398.43, -3243.5, 1435237.2, 12348.43, -3243.6, 54323.2,
]
const LOCALES = [
  'fr-FR',
  'en-US',
  'fr-FR',
  'en-US',
  'en-US',
  'zh-CN',
  'en-US',
  'en-US',
  'fr-FR',
]
const FORMATS = [
  {
    style: 'currency',
    currency: 'USD',
    currencySign: 'accounting',
    signDisplay: 'always',
  },
  {},
  {
    style: 'percent',
    signDisplay: 'always',
  },
  {},
  {
    style: 'unit',
    unit: 'meter',
    notation: 'compact',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'never',
  },
  {
    style: 'currency',
    currency: 'USD',
  },
  {},
  {
    signDisplay: 'always',
  },
] as Format[]

const [value, cycleValue] = useCycle(NUMBERS)
const [locale, cycleLocale] = useCycle(LOCALES)
const [format, cycleFormat] = useCycle(FORMATS)
const onShuffle = () => {
  cycleValue()
  cycleLocale()
  cycleFormat()
}
</script>

<template>
  <div>
    <button @click="onShuffle">shuffle</button>

    <div>
      <vue-number-flow
        :format="format"
        :locale="locale"
        :value="value"
      ></vue-number-flow>
    </div>

    <div>
      {{ value }}
    </div>
  </div>
</template>
