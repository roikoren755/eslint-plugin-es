import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-math-imul';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Math.imul' },
};

new RuleTester().run('no-math-imul', rule, {
  valid: ['Math', 'Math.min', 'Math.max', 'let Math = 0; Math.imul'],
  invalid: [{ code: 'Math.imul', errors: [error] }],
});
