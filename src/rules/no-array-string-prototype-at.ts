import { createRule } from '../util/create-rule';
import { definePrototypeMethodHandler, schema } from '../util/define-prototype-method-handler';
import type { Options } from '../util/define-prototype-method-handler';

export const category = 'ES2022';
export default createRule<Options, 'forbidden'>({
  name: 'no-array-string-prototype-at',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `{Array,String,TypedArray}.prototype.at()` methods.', recommended: false },
    schema,
    messages: { forbidden: "ES2022 '{{name}}' method is forbidden." },
  },
  defaultOptions: [{}],
  create(context, options) {
    return definePrototypeMethodHandler(context, options, {
      Array: ['at'],
      String: ['at'],
      Int8Array: ['at'],
      Uint8Array: ['at'],
      Uint8ClampedArray: ['at'],
      Int16Array: ['at'],
      Uint16Array: ['at'],
      Int32Array: ['at'],
      Uint32Array: ['at'],
      Float32Array: ['at'],
      Float64Array: ['at'],
      BigInt64Array: ['at'],
      BigUint64Array: ['at'],
    });
  },
});
