import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';

export const category = 'ES2022';
export default createRule<[], 'forbidden'>({
  name: 'no-private-in',
  meta: {
    type: 'problem',
    docs: { description: 'disallow `#x in obj`.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2022 private in (`#{{private}} in {{object}}`) is forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      "BinaryExpression[operator='in'] > PrivateIdentifier.left"(node: TSESTree.PrivateIdentifier) {
        if (node.parent?.type !== 'BinaryExpression') {
          return;
        }

        context.report({
          node,
          messageId: 'forbidden',
          data: {
            private: node.name,
            object: node.parent.right.type === 'Identifier' ? node.parent.right.name : 'object',
          },
        });
      },
    };
  },
});
