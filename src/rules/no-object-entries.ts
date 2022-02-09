import { ASTUtils } from '@typescript-eslint/utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES2017';
export default createRule<[], 'forbidden'>({
  name: 'no-object-entries',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Object.entries` method.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2017 '{{name}}' method is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, { Object: { entries: { [ASTUtils.ReferenceTracker.READ]: true } } });
  },
});
