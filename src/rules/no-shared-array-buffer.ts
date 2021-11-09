import { ASTUtils } from '@typescript-eslint/experimental-utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES2017';
export default createRule<[], 'forbidden'>({
  name: 'no-shared-array-buffer',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `SharedArrayBuffer` class.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2017 '{{name}}' class is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, { SharedArrayBuffer: { [ASTUtils.ReferenceTracker.READ]: true } });
  },
});
