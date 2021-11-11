import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';
import { getRegExpCalls } from '../util/get-regexp-calls';

export const category = 'ES2022';
export default createRule<[], 'forbidden'>({
  name: 'no-regexp-d-flag',
  meta: {
    type: 'problem',
    docs: { description: 'disallow RegExp `d` flag.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2022 RegExp 'd' flag is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return {
      'Literal[regex]'(node: TSESTree.RegExpLiteral) {
        if (node.regex.flags.includes('d')) {
          context.report({ node, messageId: 'forbidden' });
        }
      },

      'Program:exit'() {
        const scope = context.getScope();

        for (const { node, flags } of getRegExpCalls(scope)) {
          if (flags?.includes('d')) {
            context.report({ node, messageId: 'forbidden' });
          }
        }
      },
    };
  },
});
