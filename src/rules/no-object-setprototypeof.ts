import { ASTUtils } from '@typescript-eslint/utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-object-setprototypeof',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Object.setPrototypeOf` method.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2015 '{{name}}' method is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, { Object: { setPrototypeOf: { [ASTUtils.ReferenceTracker.READ]: true } } });
  },
});
