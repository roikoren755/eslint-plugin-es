import { createRule } from '../util/create-rule';
import type { Options } from '../util/define-prototype-method-handler';
import { definePrototypeMethodHandler, schema } from '../util/define-prototype-method-handler';

export const category = 'ES2019';
export default createRule<Options, 'forbidden'>({
  name: 'no-string-prototype-trimstart-trimend',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `String.prototype.{trimStart,trimEnd}` methods.', recommended: false },
    schema,
    messages: { forbidden: "ES2019 '{{name}}' method is forbidden." },
  },
  defaultOptions: [{}],
  create(context, options) {
    return definePrototypeMethodHandler(context, options, { String: ['trimEnd', 'trimStart'] });
  },
});
