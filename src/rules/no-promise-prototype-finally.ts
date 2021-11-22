import { createRule } from '../util/create-rule';
import type { Options } from '../util/define-prototype-method-handler';
import { definePrototypeMethodHandler, schema } from '../util/define-prototype-method-handler';

export const category = 'ES2018';
export default createRule<Options, 'forbidden'>({
  name: 'no-promise-prototype-finally',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Promise.prototype.finally` method.', recommended: false },
    schema,
    messages: { forbidden: "ES2018 '{{name}}' method is forbidden." },
  },
  defaultOptions: [{}],
  create(context, options) {
    return definePrototypeMethodHandler(context, options, { Promise: ['finally'] });
  },
});
