import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';

interface IStack {
  upper: IStack;
  inObjectMethod: boolean;
}

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-object-super-properties',
  meta: {
    type: 'problem',
    docs: { description: 'disallow `super` property accesses in object literals.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2015 'super' property accesses in object literals are forbidden." },
  },
  defaultOptions: [],
  create(context) {
    let stack: IStack | undefined;

    return {
      Super(node) {
        if (stack?.inObjectMethod) {
          context.report({ node, messageId: 'forbidden' });
        }
      },

      ':matches(FunctionExpression, FunctionDeclaration)'(
        node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression,
      ) {
        stack = {
          inObjectMethod: node.parent?.type === 'Property' && !!node.parent.method,
          upper: stack as IStack,
        };
      },
      ':matches(FunctionExpression, FunctionDeclaration):exit'() {
        stack = stack?.upper;
      },
    };
  },
});
