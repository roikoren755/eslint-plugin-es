import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-math-hypot';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Math.hypot' },
};

new RuleTester().run('no-math-hypot', rule, {
  valid: ['Math', 'Math.min', 'Math.max', 'let Math = 0; Math.hypot'],
  invalid: [{ code: 'Math.hypot', errors: [error] }],
});
