import { createRule } from '../util/create-rule';
import { definePrototypeMethodHandler, schema } from '../util/define-prototype-method-handler';
import type { IAggressive } from '../util/define-prototype-method-handler';

export const category = 'ES2015';
export default createRule<[options: IAggressive], 'forbidden'>({
  name: 'no-regexp-prototype-flags',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `RegExp.prototype.flags` property.', recommended: false },
    schema,
    messages: { forbidden: "ES2015 '{{name}}' property is forbidden." },
  },
  defaultOptions: [{}],
  create(context) {
    return definePrototypeMethodHandler(context, { RegExp: ['flags'] });
  },
});
