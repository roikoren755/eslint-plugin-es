import { ASTUtils } from '@typescript-eslint/utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES2021';
export default createRule<[], 'forbidden'>({
  name: 'no-promise-any',
  meta: {
    type: 'problem',
    docs: { description: 'disallow `Promise.any` function and `AggregateError` class.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2021 '{{name}}' is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, {
      AggregateError: { [ASTUtils.ReferenceTracker.READ]: true },
      Promise: { any: { [ASTUtils.ReferenceTracker.READ]: true } },
    });
  },
});
