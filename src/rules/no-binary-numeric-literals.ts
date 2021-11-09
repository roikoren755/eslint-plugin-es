import { createRule } from '../util/create-rule';

const Pattern = /^0[bB]/u;

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-binary-numeric-literals',
  meta: {
    type: 'problem',
    docs: { description: 'disallow binary numeric literals.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2015 binary numeric literals are forbidden.' },
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
