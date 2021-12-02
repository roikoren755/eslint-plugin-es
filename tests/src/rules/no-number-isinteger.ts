import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-number-isinteger';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Number.isInteger' },
};

new RuleTester().run('no-number-isinteger', rule, {
  valid: ['Number', 'Number.xyz', 'let Number = 0; Number.isInteger'],
  invalid: [{ code: 'Number.isInteger', errors: [error] }],
});
