import { ASTUtils } from '@typescript-eslint/experimental-utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES2022';
export default createRule<[], 'forbidden'>({
  name: 'no-object-hasown',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Object.hasOwn` method.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2022 '{{name}}' method is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, { Object: { hasOwn: { [ASTUtils.ReferenceTracker.READ]: true } } });
  },
});
