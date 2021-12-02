import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-math-sign';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Math.sign' },
};

new RuleTester().run('no-math-sign', rule, {
  valid: ['Math', 'Math.min', 'Math.max', 'let Math = 0; Math.sign'],
  invalid: [{ code: 'Math.sign', errors: [error] }],
});
