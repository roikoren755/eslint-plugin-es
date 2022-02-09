import { ASTUtils } from '@typescript-eslint/utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES2020';
export default createRule<[], 'forbidden'>({
  name: 'no-global-this',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `globalThis` variable.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2020 '{{name}}' variable is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, { globalThis: { [ASTUtils.ReferenceTracker.READ]: true } });
  },
});
