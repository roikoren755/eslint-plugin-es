import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-math-trunc';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Math.trunc' },
};

new RuleTester().run('no-math-trunc', rule, {
  valid: ['Math', 'Math.min', 'Math.max', 'let Math = 0; Math.trunc'],
  invalid: [{ code: 'Math.trunc', errors: [error] }],
});
