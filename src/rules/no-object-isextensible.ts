import { ASTUtils } from '@typescript-eslint/utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES5';
export default createRule<[], 'forbidden'>({
  name: 'no-object-isextensible',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Object.isExtensible` method.', recommended: false },
    schema: [],
    messages: { forbidden: "ES5 '{{name}}' method is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, { Object: { isExtensible: { [ASTUtils.ReferenceTracker.READ]: true } } });
  },
});
