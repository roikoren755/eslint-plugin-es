import { createRule } from '../util/create-rule';
import type { IAggressive } from '../util/define-prototype-method-handler';
import { definePrototypeMethodHandler, schema } from '../util/define-prototype-method-handler';

export const category = 'ES2018';
export default createRule<[options: IAggressive], 'forbidden'>({
  name: 'no-promise-prototype-finally',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Promise.prototype.finally` method.', recommended: false },
    schema,
    messages: { forbidden: "ES2018 '{{name}}' method is forbidden." },
  },
  defaultOptions: [{}],
  create(context) {
    return definePrototypeMethodHandler(context, { Promise: ['finally'] });
  },
});
