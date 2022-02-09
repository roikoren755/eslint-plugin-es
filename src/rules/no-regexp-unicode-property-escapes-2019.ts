import type { TSESTree } from '@typescript-eslint/typescript-estree';
import type { TSESLint } from '@typescript-eslint/utils';
import { RegExpValidator } from 'regexpp';

import { createRule } from '../util/create-rule';
import { getRegExpCalls } from '../util/get-regexp-calls';

const scNamePattern = /^(?:Script(?:_Extensions)?|scx?)$/u;
const scValuePattern =
  /^(?:Dogr|Dogra|Gong|Gunjala_Gondi|Hanifi_Rohingya|Maka|Makasar|Medefaidrin|Medf|Old_Sogdian|Rohg|Sogd|Sogdian|Sogo)$/u;

const isNewUnicodePropertyKeyValuePair = (key: string, value: string): boolean =>
  scNamePattern.test(key) && scValuePattern.test(value);

const isNewBinaryUnicodeProperty = (key: string): boolean => key === 'Extended_Pictographic';

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
    let foundValue = '';

    new RegExpValidator({
      onUnicodePropertyCharacterSet(start, end, _kind, key, value) {
        if (foundValue) {
          return;
        }

        if (value ? isNewUnicodePropertyKeyValuePair(key, value) : isNewBinaryUnicodeProperty(key)) {
          foundValue = pattern.slice(start, end);
        }
      },
    }).validatePattern(pattern, 0, pattern.length, flags.includes('u'));

    if (foundValue) {
      context.report({
        node,
        messageId: 'forbidden',
        data: { value: foundValue },
      });
    }
  } catch (error) {
    if ((error as Error).message.startsWith('Invalid regular expression:')) {
      return;
    }

    throw error;
  }
};

export const category = 'ES2019';
export default createRule<[], 'forbidden'>({
  name: 'no-regexp-unicode-property-escapes-2019',
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow the new values of RegExp Unicode property escape sequences in ES2019.',
      recommended: false,
    },
    schema: [],
    messages: { forbidden: "ES2019 '{{value}}' is forbidden." },
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
