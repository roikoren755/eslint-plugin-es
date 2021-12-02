import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-exponential-operators';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, column: 1, data: {} };

new RuleTester().run('no-exponential-operators', rule, {
  valid: ['a*b', 'a*=b'],
  invalid: [
    {
      code: 'a**b',
      errors: [{ ...error, type: AST_NODE_TYPES.BinaryExpression }],
    },
    {
      code: 'a**=b',
      errors: [{ ...error, type: AST_NODE_TYPES.AssignmentExpression }],
    },
  ],
});
