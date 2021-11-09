import { ASTUtils } from '@typescript-eslint/experimental-utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES2017';
export default createRule<[], 'forbidden'>({
  name: 'no-object-values',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Object.values` method.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2017 '{{name}}' method is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, { Object: { values: { [ASTUtils.ReferenceTracker.READ]: true } } });
  },
});
