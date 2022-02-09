import { ASTUtils } from '@typescript-eslint/utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES2017';
export default createRule<[], 'forbidden'>({
  name: 'no-atomics',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Atomics` class.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2017 '{{name}}' class is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, { Atomics: { [ASTUtils.ReferenceTracker.READ]: true } });
  },
});
