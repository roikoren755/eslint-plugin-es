import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';

export const category = 'ES2018';
export default createRule<[], 'forbidden'>({
  name: 'no-malformed-template-literals',
  meta: {
    type: 'problem',
    docs: { description: 'disallow template literals with invalid escape sequences.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2018 template literals with invalid escape sequences are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    const reported = new Set<TSESTree.Node>();

    return {
      'TemplateElement[value.cooked=null]'(elementNode: TSESTree.TemplateElement) {
        const node = elementNode.parent;

        if (node && !reported.has(node)) {
          reported.add(node);
          context.report({ node, messageId: 'forbidden' });
        }
      },
    };
  },
});
