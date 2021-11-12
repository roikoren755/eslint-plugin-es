import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';

/**
 * Checks if the given token is a nullish coalescing operator or not.
 * @param {TSESTree.Token} token - The token to check.
 * @returns {boolean} `true` if the token is a nullish coalescing operator.
 */
const isNullishCoalescingOperator = (token: TSESTree.Token): boolean =>
  token.value === '??' && token.type === 'Punctuator';

export const category = 'ES2020';
export const typescript = true;
export default createRule<[], 'forbidden'>({
  name: 'no-nullish-coalescing-operators',
  meta: {
    type: 'problem',
    docs: { description: 'disallow nullish coalescing operators.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2020 nullish coalescing operators are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      "LogicalExpression[operator='??']"(node: TSESTree.LogicalExpression) {
        context.report({
          node: context.getSourceCode().getTokenAfter(node.left, isNullishCoalescingOperator) as TSESTree.Token,
          messageId: 'forbidden',
        });
      },
    };
  },
});
