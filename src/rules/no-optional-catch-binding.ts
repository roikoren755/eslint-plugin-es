import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';

export const category = 'ES2019';
export const typescript = true;
export default createRule<[], 'forbidden'>({
  name: 'no-optional-catch-binding',
  meta: {
    type: 'problem',
    docs: { description: 'disallow optional `catch` binding.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2019 optional 'catch' binding is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return {
      'CatchClause[param=null]'(node: TSESTree.CatchClause) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
