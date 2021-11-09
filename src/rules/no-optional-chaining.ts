import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';

export const category = 'ES2020';
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

    /**
     * Checks if the given token is a `?.` token or not.
     * @param {Token} token The token to check.
     * @returns {boolean} `true` if the token is a `?.` token.
     */
    const isQuestionDotToken = (token: TSESTree.Token): boolean =>
      token.value === '?.' &&
      (token.type === 'Punctuator' || // espree has been parsed well.
        // espree@7.1.0 doesn't parse "?." tokens well. Therefore, get the string from the source code and check it.
        sourceCode.getText(token as unknown as TSESTree.Node) === '?.');

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
