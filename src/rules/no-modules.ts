import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-modules',
  meta: {
    type: 'problem',
    docs: { description: 'disallow modules.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2015 modules are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      'ExportAllDeclaration, ExportDefaultDeclaration, ExportNamedDeclaration, ImportDeclaration'(node: TSESTree.Node) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
