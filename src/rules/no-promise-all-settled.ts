import { ASTUtils } from '@typescript-eslint/experimental-utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES2020';
export default createRule<[], 'forbidden'>({
  name: 'no-promise-all-settled',
  meta: {
    type: 'problem',
    docs: { description: 'disallow `Promise.allSettled` function.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2020 'Promise.allSettled' function is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, { Promise: { allSettled: { [ASTUtils.ReferenceTracker.READ]: true } } });
  },
});
