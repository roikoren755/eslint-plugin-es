import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-math-expm1';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Math.expm1' },
};

new RuleTester().run('no-math-expm1', rule, {
  valid: ['Math', 'Math.min', 'Math.max', 'let Math = 0; Math.expm1'],
  invalid: [{ code: 'Math.expm1', errors: [error] }],
});
