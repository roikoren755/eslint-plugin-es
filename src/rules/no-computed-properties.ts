import { createRule } from '../util/create-rule';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-computed-properties',
  meta: {
    type: 'problem',
    docs: { description: 'disallow computed properties.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2015 computed properties are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      ':matches(Property, MethodDefinition)[computed=true]'(node) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
