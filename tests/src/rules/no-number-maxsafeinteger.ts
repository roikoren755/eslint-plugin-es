import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-number-maxsafeinteger';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Number.MAX_SAFE_INTEGER' },
};

new RuleTester().run('no-number-maxsafeinteger', rule, {
  valid: ['Number', 'Number.xyz', 'let Number = 0; Number.MAX_SAFE_INTEGER'],
  invalid: [{ code: 'Number.MAX_SAFE_INTEGER', errors: [error] }],
});
