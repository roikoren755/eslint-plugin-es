import { createRule } from '../util/create-rule';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-generators',
  meta: {
    type: 'problem',
    docs: { description: 'disallow generator function declarations.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2015 generator function declarations are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      ':function[generator=true]'(node) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
