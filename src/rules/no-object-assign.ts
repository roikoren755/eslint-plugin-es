import { ASTUtils } from '@typescript-eslint/experimental-utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-object-assign',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Object.assign` method.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2015 '{{name}}' method is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, { Object: { assign: { [ASTUtils.ReferenceTracker.READ]: true } } });
  },
});
