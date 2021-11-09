import { createRule } from '../util/create-rule';
import { definePrototypeMethodHandler, schema } from '../util/define-prototype-method-handler';
import type { IAggressive } from '../util/define-prototype-method-handler';

export const category = 'ES2019';
export default createRule<[options: IAggressive], 'forbidden'>({
  name: 'no-symbol-prototype-description',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Symbol.prototype.description` property.', recommended: false },
    schema,
    messages: { forbidden: "ES2019 '{{name}}' property is forbidden." },
  },
  defaultOptions: [{}],
  create(context) {
    return definePrototypeMethodHandler(context, { Symbol: ['description'] });
  },
});
