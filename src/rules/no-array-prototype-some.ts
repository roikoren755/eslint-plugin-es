import { createRule } from '../util/create-rule';
import { definePrototypeMethodHandler, schema } from '../util/define-prototype-method-handler';
import type { Options } from '../util/define-prototype-method-handler';

export const category = 'ES5';
export default createRule<Options, 'forbidden'>({
  name: 'no-array-prototype-some',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Array.prototype.some` method.', recommended: false },
    schema,
    messages: { forbidden: "ES5 '{{name}}' method is forbidden." },
  },
  defaultOptions: [{}],
  create(context, options) {
    return definePrototypeMethodHandler(context, options, { Array: ['some'] });
  },
});
