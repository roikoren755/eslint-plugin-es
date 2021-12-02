import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-math-log1p';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Math.log1p' },
};

new RuleTester().run('no-math-log1p', rule, {
  valid: ['Math', 'Math.min', 'Math.max', 'let Math = 0; Math.log1p'],
  invalid: [{ code: 'Math.log1p', errors: [error] }],
});
