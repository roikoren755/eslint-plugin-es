import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-math-fround';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Math.fround' },
};

new RuleTester().run('no-math-fround', rule, {
  valid: ['Math', 'Math.min', 'Math.max', 'let Math = 0; Math.fround'],
  invalid: [{ code: 'Math.fround', errors: [error] }],
});
