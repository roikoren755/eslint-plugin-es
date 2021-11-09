import { createRule } from '../util/create-rule';

export const category = 'ES2018';
export default createRule<[], 'forbidden'>({
  name: 'no-async-iteration',
  meta: {
    type: 'problem',
    docs: { description: 'disallow async iteration.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2018 async iteration is forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      ':function[async=true][generator=true]'(node) {
        context.report({ node, messageId: 'forbidden' });
      },
      'ForOfStatement[await=true]'(node) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
