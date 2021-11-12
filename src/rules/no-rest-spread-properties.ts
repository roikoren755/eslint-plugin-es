import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';

export const category = 'ES2018';
export const typescript = true;
export default createRule<[], 'forbidden'>({
  name: 'no-rest-spread-properties',
  meta: {
    type: 'problem',
    docs: { description: 'disallow rest/spread properties.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2018 rest/spread properties are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      'ObjectPattern > RestElement'(node: TSESTree.RestElement) {
        context.report({ node, messageId: 'forbidden' });
      },
      'ObjectExpression > SpreadElement'(node: TSESTree.SpreadElement) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
