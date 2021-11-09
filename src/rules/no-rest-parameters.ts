import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-rest-parameters',
  meta: {
    type: 'problem',
    docs: { description: 'disallow rest parameters.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2015 rest parameters are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      ':function > RestElement'(node: TSESTree.RestElement) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
