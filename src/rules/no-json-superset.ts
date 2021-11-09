import { createRule } from '../util/create-rule';
import { definePatternSearchGenerator } from '../util/define-pattern-search-generator';

const iterateTargetChars = definePatternSearchGenerator(/[\u2028\u2029]/gu);

export const category = 'ES2019';
export default createRule<[], 'forbidden'>({
  name: 'no-json-superset',
  meta: {
    type: 'problem',
    docs: { description: 'disallow `\\u2028` and `\\u2029` in string literals.', recommended: false },
    fixable: 'code',
    schema: [],
    messages: { forbidden: "ES2019 '\\u{{code}}' in string literals is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode();

    return {
      Literal(node) {
        if (typeof node.value !== 'string') {
          return;
        }

        const [offset] = node.range;

        for (const { index } of iterateTargetChars(node.raw)) {
          const code = node.raw.codePointAt(index)?.toString(16);
          const loc = sourceCode.getLocFromIndex(offset + index);

          context.report({
            node,
            loc,
            messageId: 'forbidden',
            data: { code },
            fix: (fixer) => fixer.replaceTextRange([offset + index, offset + index + 1], `\\u${code as string}`),
          });
        }
      },
    };
  },
});
