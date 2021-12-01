import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';
import { isCommaToken } from '../util/is-comma-token';

export const category = 'ES5';
export default createRule<[], 'forbidden'>({
  name: 'no-trailing-commas',
  meta: {
    type: 'problem',
    docs: { description: 'disallow trailing commas in array/object literals.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES5 trailing commas in array/object literals are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode();

    return {
      'ArrayExpression, ArrayPattern, ObjectExpression, ObjectPattern'(
        node: TSESTree.ArrayExpression | TSESTree.ArrayPattern | TSESTree.ObjectExpression | TSESTree.ObjectPattern,
      ) {
        const token = sourceCode.getLastToken(node, 1);

        if (isCommaToken(token)) {
          context.report({ node, messageId: 'forbidden' });
        }
      },
    };
  },
});
