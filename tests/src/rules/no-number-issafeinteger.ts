import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-number-issafeinteger';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Number.isSafeInteger' },
};

new RuleTester().run('no-number-issafeinteger', rule, {
  valid: ['Number', 'Number.xyz', 'let Number = 0; Number.isSafeInteger'],
  invalid: [{ code: 'Number.isSafeInteger', errors: [error] }],
});
