import { createRule } from '../util/create-rule';

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-default-parameters',
  meta: {
    type: 'problem',
    docs: { description: 'disallow default parameters.', recommended: false },
    schema: [],
    messages: { forbidden: 'ES2015 default parameters are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    return {
      ':function > AssignmentPattern'(node) {
        context.report({ node, messageId: 'forbidden' });
      },
    };
  },
});
