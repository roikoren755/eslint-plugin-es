import { ASTUtils } from '@typescript-eslint/utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-symbol',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Symbol` class.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2015 '{{name}}' class is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, { Symbol: { [ASTUtils.ReferenceTracker.READ]: true } });
  },
});
