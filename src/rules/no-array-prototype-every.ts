import { createRule } from '../util/create-rule';
import { definePrototypeMethodHandler, schema } from '../util/define-prototype-method-handler';
import type { IAggressive } from '../util/define-prototype-method-handler';

export const category = 'ES5';
export default createRule<[options: IAggressive], 'forbidden'>({
  name: 'no-array-prototype-every',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Array.prototype.every` method.', recommended: false },
    schema,
    messages: { forbidden: "ES5 '{{name}}' method is forbidden." },
  },
  defaultOptions: [{}],
  create(context) {
    return definePrototypeMethodHandler(context, { Array: ['every'] });
  },
});
