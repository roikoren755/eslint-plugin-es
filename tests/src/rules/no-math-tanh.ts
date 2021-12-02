import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-math-tanh';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Math.tanh' },
};

new RuleTester().run('no-math-tanh', rule, {
  valid: ['Math', 'Math.min', 'Math.max', 'let Math = 0; Math.tanh'],
  invalid: [{ code: 'Math.tanh', errors: [error] }],
});
