import type { TSESTree } from '@typescript-eslint/typescript-estree';

import { createRule } from '../util/create-rule';
import { definePatternSearchGenerator } from '../util/define-pattern-search-generator';

const codePointEscapeSearchGenerator = definePatternSearchGenerator(/\\u\{[0-9a-fA-F]+\}/gu);

/**
 * Number to Hex
 * @param {number} num number
 * @returns {string} hex string
 */
const toHex = (num: number): string => `0000${num.toString(16).toUpperCase()}`.slice(-4);

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-unicode-codepoint-escapes',
  meta: {
    type: 'problem',
    docs: { description: 'disallow Unicode code point escape sequences.', recommended: false },
    fixable: 'code',
    schema: [],
    messages: { forbidden: 'ES2015 Unicode code point escape sequences are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode();

    /**
     * find code point escape, and report
     * @param  {Node} node node
     * @returns {void}
     */
    const findAndReport = (node: TSESTree.Node): void => {
      const text = sourceCode.getText(node);

      for (const match of codePointEscapeSearchGenerator(text)) {
        const start = match.index;
        const end = start + match[0].length;
        const range = [start + node.range[0], end + node.range[0]];

        context.report({
          node,
          loc: { start: sourceCode.getLocFromIndex(range[0]), end: sourceCode.getLocFromIndex(range[1]) },
          messageId: 'forbidden',
          fix: (fixer) => {
            const codePointStr = text.slice(start + 3, end - 1);
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
            let codePoint = Number(`0x${codePointStr}`);
            let replacement: string | null;

            if (codePoint <= 0xff_ff) {
              // BMP code point
              replacement = toHex(codePoint);
            } else {
              // Astral code point; split in surrogate halves
              // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
              codePoint -= 0x1_00_00;

              // eslint-disable-next-line no-bitwise
              const highSurrogate = (codePoint >> 10) + 0xd8_00;
              const lowSurrogate = (codePoint % 0x4_00) + 0xdc_00;

              replacement = `${toHex(highSurrogate)}\\u${toHex(lowSurrogate)}`;
            }

            return fixer.replaceTextRange([range[0] + 2, range[1]], replacement);
          },
        });
      }
    };

    return {
      Identifier(node) {
        findAndReport(node);
      },
      Literal(node) {
        if (typeof node.value === 'string') {
          findAndReport(node);
        }
      },
      TemplateElement(node) {
        findAndReport(node);
      },
    };
  },
});
