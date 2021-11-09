import { createRule } from '../util/create-rule';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-for-of-loops',
  meta: {
    type: 'problem',
    docs: { description: 'disallow `for-of` statements.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2015 'for-of' statements are forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return {
      ForOfStatement(node) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
