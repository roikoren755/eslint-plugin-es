import { createRule } from '../util/create-rule';

export const category = 'ES2020';
export default createRule<[], 'forbidden'>({
  name: 'no-dynamic-import',
  meta: {
    type: 'problem',
    docs: { description: 'disallow `import()` syntax.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2020 'import()' syntax is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return {
      ImportExpression(node) {
        context.report({ messageId: 'forbidden', node });
      },
    };
  },
});
