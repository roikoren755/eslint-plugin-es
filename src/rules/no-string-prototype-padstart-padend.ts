import { createRule } from '../util/create-rule';
import { definePrototypeMethodHandler, schema } from '../util/define-prototype-method-handler';
import type { IAggressive } from '../util/define-prototype-method-handler';

export const category = 'ES2017';
export default createRule<[options: IAggressive], 'forbidden'>({
  name: 'no-string-prototype-padstart-padend',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `String.prototype.{padStart,padEnd}` methods.', recommended: false },
    schema,
    messages: { forbidden: "ES2017 '{{name}}' method is forbidden." },
  },
  defaultOptions: [{}],
  create(context) {
    return definePrototypeMethodHandler(context, { String: ['padEnd', 'padStart'] });
  },
});
