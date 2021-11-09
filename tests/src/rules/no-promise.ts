import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-promise';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.Identifier, data: { name: 'Promise' } };

new RuleTester().run('no-promise', rule, {
  valid: ['Array', 'Object', 'let Promise = 0; Promise'],
  invalid: [
    { code: 'Promise', errors: [{ ...error, column: 1 }] },
    { code: 'function f() { Promise }', errors: [{ ...error, column: 16 }] },
  ],
});
