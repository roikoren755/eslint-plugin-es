import { ASTUtils } from '@typescript-eslint/experimental-utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-number-minsafeinteger',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Number.MIN_SAFE_INTEGER` property.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2015 '{{name}}' property is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, { Number: { MIN_SAFE_INTEGER: { [ASTUtils.ReferenceTracker.READ]: true } } });
  },
});
