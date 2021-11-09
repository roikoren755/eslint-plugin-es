import { ASTUtils } from '@typescript-eslint/experimental-utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-set',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Set` class.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2015 '{{name}}' class is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, { Set: { [ASTUtils.ReferenceTracker.READ]: true } });
  },
});
