import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';

export const category = 'ES5';
export default createRule<[], 'forbidden'>({
  name: 'no-accessor-properties',
  meta: {
    type: 'problem',
    docs: { description: 'disallow accessor properties.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES5 accessor properties are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      "Property[kind='get'], Property[kind='set'], MethodDefinition[kind='get'], MethodDefinition[kind='set']"(
        node: TSESTree.MethodDefinition | TSESTree.Property,
      ) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
