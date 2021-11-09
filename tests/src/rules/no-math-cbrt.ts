import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-math-cbrt';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Math.cbrt' },
};

new RuleTester().run('no-math-cbrt', rule, {
  valid: ['Math', 'Math.min', 'Math.max', 'let Math = 0; Math.cbrt'],
  invalid: [{ code: 'Math.cbrt', errors: [error] }],
});
