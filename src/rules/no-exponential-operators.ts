import { createRule } from '../util/create-rule';

export const category = 'ES2016';
export default createRule<[], 'forbidden'>({
  name: 'no-exponential-operators',
  meta: {
    type: 'problem',
    docs: { description: 'disallow exponential operators.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2016 exponential operators are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      "AssignmentExpression[operator='**='], BinaryExpression[operator='**']"(node) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
