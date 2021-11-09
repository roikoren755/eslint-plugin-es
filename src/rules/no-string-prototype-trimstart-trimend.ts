import { createRule } from '../util/create-rule';
import type { IAggressive } from '../util/define-prototype-method-handler';
import { definePrototypeMethodHandler, schema } from '../util/define-prototype-method-handler';

export const category = 'ES2019';
export default createRule<[options: IAggressive], 'forbidden'>({
  name: 'no-string-prototype-trimstart-trimend',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `String.prototype.{trimStart,trimEnd}` methods.', recommended: false },
    schema,
    messages: { forbidden: "ES2019 '{{name}}' method is forbidden." },
  },
  defaultOptions: [{}],
  create(context) {
    return definePrototypeMethodHandler(context, { String: ['trimEnd', 'trimStart'] });
  },
});
