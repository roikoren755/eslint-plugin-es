import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-spread-elements',
  meta: {
    type: 'problem',
    docs: { description: 'disallow spread elements.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2015 spread elements are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      ':matches(ArrayExpression, CallExpression, NewExpression) > SpreadElement'(node: TSESTree.SpreadElement) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
