import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-math-sinh';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Math.sinh' },
};

new RuleTester().run('no-math-sinh', rule, {
  valid: ['Math', 'Math.min', 'Math.max', 'let Math = 0; Math.sinh'],
  invalid: [{ code: 'Math.sinh', errors: [error] }],
});
