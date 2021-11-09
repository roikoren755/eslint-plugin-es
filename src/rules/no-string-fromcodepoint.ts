import { ASTUtils } from '@typescript-eslint/experimental-utils';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-string-fromcodepoint',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the `String.fromCodePoint` method.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2015 '{{name}}' method is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return referenceTracker(context, { String: { fromCodePoint: { [ASTUtils.ReferenceTracker.READ]: true } } });
  },
});
