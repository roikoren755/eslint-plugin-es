import { createRule } from '../util/create-rule';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-block-scoped-functions',
  meta: {
    type: 'problem',
    docs: { description: 'disallow block-scoped function declarations.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2015 block-scoped functions are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      ':not(:function) > BlockStatement > FunctionDeclaration'(node) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
