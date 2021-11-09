import { createRule } from '../util/create-rule';

export const category = 'ES2020';
export default createRule<[], 'forbidden'>({
  name: 'no-export-ns-from',
  meta: {
    type: 'problem',
    docs: { description: 'disallow `export * as ns`.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2020 'export * as ns' are forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return {
      'ExportAllDeclaration[exported!=null]'(node) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
