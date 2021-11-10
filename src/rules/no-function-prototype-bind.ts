import { createRule } from '../util/create-rule';
import { definePrototypeMethodHandler, schema } from '../util/define-prototype-method-handler';
import type { IAggressive } from '../util/define-prototype-method-handler';

export const category = 'ES5';
export default createRule<[options: IAggressive], 'forbidden'>({
  name: 'no-function-prototype-bind',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Function.prototype.bind` method.', recommended: false },
    schema,
    messages: { forbidden: "ES5 '{{name}}' method is forbidden." },
  },
  defaultOptions: [{}],
  create(context) {
    return definePrototypeMethodHandler(context, { Function: ['bind'] });
  },
});
