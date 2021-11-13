import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';

export const category = 'ES2022';
export default createRule<[], 'forbidden'>({
  name: 'no-top-level-await',
  meta: {
    type: 'problem',
    docs: { description: 'disallow top-level `await`.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2022 top-level 'await' is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    let inFunction: TSESTree.FunctionExpression | null = null;

    return {
      ':function'(node: TSESTree.FunctionExpression) {
        inFunction = node;
      },
      ':function:exit'(node: TSESTree.FunctionExpression) {
        if (inFunction === node) {
          inFunction = null;
        }
      },
      'AwaitExpression, ForOfStatement[await=true]'(node: TSESTree.AwaitExpression | TSESTree.ForOfStatement) {
        if (inFunction) {
          // not top-level
          return;
        }

        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
