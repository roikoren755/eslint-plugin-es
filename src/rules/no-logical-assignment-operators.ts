import { ASTUtils } from '@typescript-eslint/experimental-utils';
import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';

export const category = 'ES2021';
export default createRule<[], 'forbidden'>({
  name: 'no-logical-assignment-operators',
  meta: {
    type: 'problem',
    docs: { description: 'disallow logical assignment operators.', recommended: false },
    fixable: 'code',
    schema: [],
    messages: { forbidden: 'ES2021 logical assignment operators are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode();

    return {
      'AssignmentExpression[operator=/(?:\\|\\||&&|\\?\\?)=/]'(node: TSESTree.AssignmentExpression) {
        const operatorToken = sourceCode.getTokenAfter(node.left) as TSESTree.Token;

        context.report({
          node: operatorToken,
          messageId: 'forbidden',
          fix(fixer) {
            if (node.left.type !== 'Identifier') {
              return null;
            }

            const newOperator = node.operator.slice(-1);
            const biOperator = node.operator.slice(0, -1);
            const varText = sourceCode.getText(node.left);

            const results = [
              fixer.replaceText(operatorToken, newOperator),
              fixer.insertTextAfter(operatorToken, ` ${varText} ${biOperator}`),
            ];

            if (!ASTUtils.isParenthesized(node.right, sourceCode)) {
              results.push(fixer.insertTextBefore(node.right, '('), fixer.insertTextAfter(node.right, ')'));
            }

            return results;
          },
        });
      },
    };
  },
});
