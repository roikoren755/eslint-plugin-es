import { createRule } from '../util/create-rule';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-classes',
  meta: {
    type: 'problem',
    docs: { description: 'disallow class declarations.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2015 class declarations are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      'ClassDeclaration, ClassExpression'(node) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
