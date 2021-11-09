import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';
import { isCommaToken } from '../util/is-comma-token';

export const category = 'ES2017';
export default createRule<[], 'forbidden'>({
  name: 'no-trailing-function-commas',
  meta: {
    type: 'problem',
    docs: { description: 'disallow trailing commas in parameter/argument lists.', recommended: false },
    fixable: 'code',
    schema: [],
    messages: { forbidden: 'ES2017 trailing commas in parameter/argument lists are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode();

    return {
      ':function'(node: TSESTree.FunctionExpression) {
        const { length } = node.params;

        if (length === 0) {
          return;
        }

        const lastParam = node.params[length - 1];
        const token = sourceCode.getTokenAfter(lastParam);

        if (isCommaToken(token)) {
          context.report({ loc: token.loc, messageId: 'forbidden', fix: (fixer) => fixer.remove(token) });
        }
      },
      'CallExpression, NewExpression'(node: TSESTree.CallExpression | TSESTree.NewExpression) {
        const token = sourceCode.getLastToken(node, 1);

        if (node.arguments.length > 0 && isCommaToken(token)) {
          context.report({ loc: token.loc, messageId: 'forbidden', fix: (fixer) => fixer.remove(token) });
        }
      },
    };
  },
});
