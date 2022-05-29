import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-promise-all-settled';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, column: 1, type: AST_NODE_TYPES.MemberExpression, data: {} };

new RuleTester().run('no-promise-all-settled', rule, {
  valid: ['Promise.all'],
  invalid: [{ code: 'Promise.allSettled', errors: [error] }],
});
