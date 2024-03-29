import { ASTUtils } from '@typescript-eslint/utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES5';
export default createRule<[], 'forbidden'>({
  name: 'no-json',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `JSON` class.', recommended: false },
    schema: [],
    messages: { forbidden: "ES5 '{{name}}' class is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, { JSON: { [ASTUtils.ReferenceTracker.READ]: true } });
  },
});
