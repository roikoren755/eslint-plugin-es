import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';

/**
 * Checks if the given token is a `?.` token or not.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is a `?.` token.
 */
const isQuestionDotToken = (token: TSESTree.Token): boolean => token.value === '?.' && token.type === 'Punctuator';

export const category = 'ES2020';
export const typescript = true;
export default createRule<[], 'forbidden'>({
  name: 'no-optional-chaining',
  meta: {
    type: 'problem',
    docs: { description: 'disallow optional chaining.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2020 optional chaining is forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode();

    return {
      'CallExpression[optional=true]'(node: TSESTree.CallExpression) {
        context.report({
          node: sourceCode.getTokenAfter(node.callee, isQuestionDotToken) as TSESTree.Token,
          messageId: 'forbidden',
        });
      },
      'MemberExpression[optional=true]'(node: TSESTree.MemberExpression) {
        context.report({
          node: sourceCode.getTokenAfter(node.object, isQuestionDotToken) as TSESTree.Token,
          messageId: 'forbidden',
        });
      },
    };
  },
});
