import { createRule } from '../util/create-rule';

const Pattern = /^0[oO]/u;

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-octal-numeric-literals',
  meta: {
    type: 'problem',
    docs: { description: 'disallow octal numeric literals.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2015 octal numeric literals are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      Literal(node) {
        if (typeof node.value === 'number' && Pattern.test(node.raw)) {
          context.report({ node, messageId: 'forbidden' });
        }
      },
    };
  },
});
