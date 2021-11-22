import { createRule } from '../util/create-rule';
import { definePrototypeMethodHandler, schema } from '../util/define-prototype-method-handler';
import type { Options } from '../util/define-prototype-method-handler';

export const category = 'ES2019';
export default createRule<Options, 'forbidden'>({
  name: 'no-array-prototype-flat',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Array.prototype.{flat,flatMap}` method.', recommended: false },
    schema,
    messages: { forbidden: "ES2019 '{{name}}' method is forbidden." },
  },
  defaultOptions: [{}],
  create(context, options) {
    return definePrototypeMethodHandler(context, options, { Array: ['flat', 'flatMap'] });
  },
});
