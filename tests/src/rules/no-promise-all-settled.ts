import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-promise-all-settled';

const error = { messageId: 'forbidden' as const, line: 1, column: 1, type: AST_NODE_TYPES.MemberExpression, data: {} };

if (!RuleTester.isSupported(2020)) {
  console.log('Skip the tests of no-promise-all-settled.');
} else {
  new RuleTester().run('no-promise-all-settled', rule, {
    valid: ['Promise.all'],
    invalid: [{ code: 'Promise.allSettled', errors: [error] }],
  });
}
