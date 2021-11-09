import { ASTUtils } from '@typescript-eslint/experimental-utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES5';
export default createRule<[], 'forbidden'>({
  name: 'no-object-getprototypeof',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Object.getPrototypeOf` method.', recommended: false },
    schema: [],
    messages: { forbidden: "ES5 '{{name}}' method is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, { Object: { getPrototypeOf: { [ASTUtils.ReferenceTracker.READ]: true } } });
  },
});
