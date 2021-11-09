import { createRule } from '../util/create-rule';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-block-scoped-variables',
  meta: {
    type: 'problem',
    docs: { description: 'disallow block-scoped variable declarations.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2015 block-scoped variables are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      "VariableDeclaration[kind='const'], VariableDeclaration[kind='let']"(node) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
