import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-math-clz32';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Math.clz32' },
};

new RuleTester().run('no-math-clz32', rule, {
  valid: ['Math', 'Math.min', 'Math.max', 'let Math = 0; Math.clz32'],
  invalid: [{ code: 'Math.clz32', errors: [error] }],
});
