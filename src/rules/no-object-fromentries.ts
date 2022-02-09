import { ASTUtils } from '@typescript-eslint/utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES2019';
export default createRule<[], 'forbidden'>({
  name: 'no-object-fromentries',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `Object.fromEntries` method.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2019 '{{name}}' method is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, { Object: { fromEntries: { [ASTUtils.ReferenceTracker.READ]: true } } });
  },
});
