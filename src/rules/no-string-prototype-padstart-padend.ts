import { createRule } from '../util/create-rule';
import { definePrototypeMethodHandler, schema } from '../util/define-prototype-method-handler';
import type { Options } from '../util/define-prototype-method-handler';

export const category = 'ES2017';
export default createRule<Options, 'forbidden'>({
  name: 'no-string-prototype-padstart-padend',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `String.prototype.{padStart,padEnd}` methods.', recommended: false },
    schema,
    messages: { forbidden: "ES2017 '{{name}}' method is forbidden." },
  },
  defaultOptions: [{}],
  create(context, options) {
    return definePrototypeMethodHandler(context, options, { String: ['padEnd', 'padStart'] });
  },
});
