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
