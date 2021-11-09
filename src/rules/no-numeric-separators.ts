import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';

/**
 * Remove the numeric separators.
 * @param  {string} raw The raw string of numeric literals
 * @returns {string} The string with the separators removed.
 */
const removeNumericSeparators = (raw: string): string => raw.replace(/_/gu, '');

export const category = 'ES2021';
export default createRule<[], 'forbidden'>({
  name: 'no-numeric-separators',
  meta: {
    type: 'problem',
    docs: { description: 'disallow numeric separators.', recommended: false },
    fixable: 'code',
    schema: [],
    messages: { forbidden: 'ES2021 numeric separators are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      Literal(node) {
        if ((typeof node.value === 'number' || (node as TSESTree.BigIntLiteral).bigint) && node.raw.includes('_')) {
          context.report({
            node,
            messageId: 'forbidden',
            fix: (fixer) => fixer.replaceText(node, removeNumericSeparators(node.raw)),
          });
        }
      },
    };
  },
});
