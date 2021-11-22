import { createRule } from '../util/create-rule';
import { definePrototypeMethodHandler, schema } from '../util/define-prototype-method-handler';
import type { Options } from '../util/define-prototype-method-handler';

export const category = 'ES2016';
export default createRule<Options, 'forbidden'>({
  name: 'no-array-prototype-includes',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Array.prototype.includes` method.', recommended: false },
    schema,
    messages: { forbidden: "ES2016 '{{name}}' method is forbidden." },
  },
  defaultOptions: [{}],
  create(context, options) {
    return definePrototypeMethodHandler(context, options, {
      Array: ['includes'],
      Int8Array: ['includes'],
      Uint8Array: ['includes'],
      Uint8ClampedArray: ['includes'],
      Int16Array: ['includes'],
      Uint16Array: ['includes'],
      Int32Array: ['includes'],
      Uint32Array: ['includes'],
      Float32Array: ['includes'],
      Float64Array: ['includes'],
      BigInt64Array: ['includes'],
      BigUint64Array: ['includes'],
    });
  },
});
