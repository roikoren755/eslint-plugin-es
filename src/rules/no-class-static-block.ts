import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';

export const category = 'ES2022';
export default createRule<[], 'forbidden'>({
  name: 'no-class-static-block',
  meta: {
    type: 'problem',
    docs: { description: 'disallow class static block.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2022 class static block is forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      StaticBlock(node: TSESTree.StaticBlock) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
