import { ASTUtils } from '@typescript-eslint/experimental-utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES2021';
export default createRule<[], 'forbidden'>({
  name: 'no-weakrefs',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `WeakRef` and `FinalizationRegistry` class.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2021 '{{name}}' class is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, {
      FinalizationRegistry: { [ASTUtils.ReferenceTracker.READ]: true },
      WeakRef: { [ASTUtils.ReferenceTracker.READ]: true },
    });
  },
});
