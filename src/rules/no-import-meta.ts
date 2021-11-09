import { createRule } from '../util/create-rule';

export const category = 'ES2020';
export default createRule<[], 'forbidden'>({
  name: 'no-import-meta',
  meta: {
    type: 'problem',
    docs: { description: 'disallow `import.meta` meta property.', recommended: false },
    schema: [],
    messages: { forbidden: "ES2020 'import.meta' meta property is forbidden." },
  },
  defaultOptions: [],
  create(context) {
    return {
      "MetaProperty[meta.name='import'][property.name='meta']"(node) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
