import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-new-target',
  meta: {
    type: 'problem',
    docs: { description: 'disallow `new.target` meta property.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2015 'new.target' meta property is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return {
      "MetaProperty[meta.name='new'][property.name='target']"(node: TSESTree.MetaProperty) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
