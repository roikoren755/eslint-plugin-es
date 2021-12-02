import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-number-minsafeinteger';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Number.MIN_SAFE_INTEGER' },
};

new RuleTester().run('no-number-minsafeinteger', rule, {
  valid: ['Number', 'Number.xyz', 'let Number = 0; Number.MIN_SAFE_INTEGER'],
  invalid: [{ code: 'Number.MIN_SAFE_INTEGER', errors: [error] }],
});
