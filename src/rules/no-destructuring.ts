import { createRule } from '../util/create-rule';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-destructuring',
  meta: {
    type: 'problem',
    docs: { description: 'disallow destructuring.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2015 destructuring is forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      ':matches(:function, AssignmentExpression, VariableDeclarator, :function > :matches(AssignmentPattern, RestElement), ForInStatement, ForOfStatement) > :matches(ArrayPattern, ObjectPattern)'(
        node,
      ) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
