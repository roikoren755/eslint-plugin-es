import { createRule } from '../util/create-rule';

export const category = 'ES2017';
export const typescript = true;
export default createRule<[], 'forbidden'>({
  name: 'no-async-functions',
  meta: {
    type: 'problem',
    docs: { description: 'disallow async function declarations.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2017 async function declarations are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      ':function[async=true]'(node) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
