import { ASTUtils } from '@typescript-eslint/experimental-utils';
import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';
import { referenceTracker } from '../util/reference-tracker';

export const category = 'ES2020';
export default createRule<[], 'forbidden'>({
  name: 'no-bigint',
  meta: {
    type: 'problem',
    docs: { description: 'disallow `bigint` syntax and built-ins.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2020 BigInt is forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      Literal(node) {
        if ((node as TSESTree.BigIntLiteral).bigint && (node as TSESTree.BigIntLiteral).bigint !== '') {
          context.report({ messageId: 'forbidden', node });
        }
      },
      ...referenceTracker(context, {
        BigInt: { [ASTUtils.ReferenceTracker.READ]: true },
        BigInt64Array: { [ASTUtils.ReferenceTracker.READ]: true },
        BigUint64Array: { [ASTUtils.ReferenceTracker.READ]: true },
      }),
    };
  },
});
