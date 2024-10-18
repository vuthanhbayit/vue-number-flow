import { NumberFlowLite } from 'number-flow'
export * from 'number-flow'

export const defineNumberFlow = () => {
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
}

import VueNumberFlow from './components/vue-number-flow.vue'
export { VueNumberFlow }
