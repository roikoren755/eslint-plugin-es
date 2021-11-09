import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-math-log2';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Math.log2' },
};

new RuleTester().run('no-math-log2', rule, {
  valid: ['Math', 'Math.min', 'Math.max', 'let Math = 0; Math.log2'],
  invalid: [{ code: 'Math.log2', errors: [error] }],
});
