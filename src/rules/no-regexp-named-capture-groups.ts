import type { TSESLint } from '@typescript-eslint/experimental-utils';
import type { TSESTree } from '@typescript-eslint/typescript-estree';
import { RegExpValidator } from 'regexpp';

import { createRule } from '../util/create-rule';
import { getRegExpCalls } from '../util/get-regexp-calls';

/**
 * Verify a given regular expression.
 * @param {TSESLint.RuleContext<'forbidden', []>} context The rule context to report.
 * @param {TSESTree.Node} node The AST node to report.
 * @param {string} pattern The pattern part of a RegExp.
 * @param {string} flags The flags part of a RegExp.
 * @returns {void}
 */
const verify = (
  context: TSESLint.RuleContext<'forbidden', []>,
  node: TSESTree.Node,
  pattern: string,
  flags: string,
): void => {
  try {
    let found = false;

    new RegExpValidator({
      onCapturingGroupEnter(_start, name) {
        if (name) {
          found = true;
        }
      },
      onBackreference(_start, _end, ref) {
        if (typeof ref === 'string') {
          found = true;
        }
      },
    }).validatePattern(pattern, 0, pattern.length, flags.includes('u'));

    if (found) {
      context.report({ node, messageId: 'forbidden' });
    }
  } catch (error) {
    if ((error as Error).message.startsWith('Invalid regular expression:')) {
      return;
    }

    throw error;
  }
};

export const category = 'ES2018';
export default createRule<[], 'forbidden'>({
  name: 'no-regexp-named-capture-groups',
  meta: {
    type: 'problem',
    docs: { description: 'disallow RegExp named capture groups.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2018 RegExp named capture groups are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      'Literal[regex]'(node: TSESTree.RegExpLiteral) {
        const { pattern, flags } = node.regex;

        verify(context, node, pattern || '', flags || '');
      },

      'Program:exit'() {
        const scope = context.getScope();

        for (const { node, pattern, flags } of getRegExpCalls(scope)) {
          verify(context, node, pattern ?? '', flags ?? '');
        }
      },
    };
  },
});
