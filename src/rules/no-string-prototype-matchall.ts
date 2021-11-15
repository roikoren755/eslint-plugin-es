import { createRule } from '../util/create-rule';
import { definePrototypeMethodHandler, schema } from '../util/define-prototype-method-handler';
import type { Options } from '../util/define-prototype-method-handler';

export const category = 'ES2020';
export default createRule<Options, 'forbidden'>({
  name: 'no-string-prototype-matchall',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `String.prototype.matchAll` method.', recommended: false },
    schema,
    messages: { forbidden: "ES2015 '{{name}}' method is forbidden." },
  },
  defaultOptions: [{}],
  create(context, options) {
    return definePrototypeMethodHandler(context, options, { String: ['matchAll'] });
  },
});
