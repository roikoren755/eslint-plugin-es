import { ASTUtils } from '@typescript-eslint/utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-number-isinteger',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Number.isInteger` property.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2015 '{{name}}' property is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, { Number: { isInteger: { [ASTUtils.ReferenceTracker.READ]: true } } });
  },
});
