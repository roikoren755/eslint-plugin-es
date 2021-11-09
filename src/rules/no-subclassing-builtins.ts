import { ASTUtils } from '@typescript-eslint/experimental-utils';
import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-subclassing-builtins',
  meta: {
    type: 'problem',
    docs: { description: 'disallow the subclassing of the built-in classes.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2015 subclassing of '{{name}}' is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return {
      'Program:exit'() {
        const tracker = new ASTUtils.ReferenceTracker(context.getScope());

        for (const { node, path } of tracker.iterateGlobalReferences({
          Array: { [ASTUtils.ReferenceTracker.READ]: true },
          Boolean: { [ASTUtils.ReferenceTracker.READ]: true },
          Error: { [ASTUtils.ReferenceTracker.READ]: true },
          RegExp: { [ASTUtils.ReferenceTracker.READ]: true },
          Function: { [ASTUtils.ReferenceTracker.READ]: true },
          Map: { [ASTUtils.ReferenceTracker.READ]: true },
          Number: { [ASTUtils.ReferenceTracker.READ]: true },
          Promise: { [ASTUtils.ReferenceTracker.READ]: true },
          Set: { [ASTUtils.ReferenceTracker.READ]: true },
          String: { [ASTUtils.ReferenceTracker.READ]: true },
        })) {
          if (node.parent?.type.startsWith('Class') && (node.parent as TSESTree.ClassExpression).superClass === node) {
            context.report({ node, messageId: 'forbidden', data: { name: path.join('.') } });
          }
        }
      },
    };
  },
});
