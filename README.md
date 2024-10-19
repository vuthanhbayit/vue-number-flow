# vue-number-flow

This Vue 3 component is a wrapper around the [number-flow](https://github.com/barvian/number-flow) web component

## Installation

```sh
npm install @vt7/vue-number-flow
```

## Props

| Prop                     | Type                        | Default    |
|--------------------------|-----------------------------|------------|
| `value`                  | `number`                    | Required   |
| `format`                 | `Intl.NumberFormatOptions`  | `undefined`|
| `locales`                | `Intl.LocalesArgument`      | `undefined`|
| `isolate`                | `boolean`                   | `false`    |
| `animated`               | `boolean`                   | `true`     |
| `respectMotionPreference`| `boolean`                   | `true`     |
| `willChange`             | `boolean`                   | `false`    |
| `trend`                  | `boolean`                   | `true`     |
| `onAnimationsStart`      | `function`                  | `undefined`|
| `onAnimationsFinish`     | `function`                  | `undefined`|
| `opacityTiming`          | `EffectTiming`              | `undefined`|
| `transformTiming`        | `EffectTiming`              | `undefined`|
| `spinTiming`             | `EffectTiming`              | `undefined`|

## Example

#### Vue3
```ts 
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { defineNumberFlow } from '@vt7/vue-number-flow'

defineNumberFlow()

createApp(App).mount('#app')

```

#### Nuxt3
```ts 
// plugins/number-flow.client.ts
import { defineNuxtPlugin } from '#imports'
import { defineNumberFlow } from '@vt7/vue-number-flow'

defineNumberFlow()

export default defineNuxtPlugin(() => {})
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  build: {
    transpile: ['number-flow']
  }
})
```

#### Use
```vue
<template>
  <vue-number-flow
    :value="1234.56"
    :locales="'vi-VN'"
    :format="{ style: 'currency', currency: 'VND' }"
  ></vue-number-flow>
</template>

<script lang="ts">
  import { VueNumberFlow } from '@vt7/vue-number-flow'
</script>
```
