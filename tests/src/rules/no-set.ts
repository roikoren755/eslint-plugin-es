import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-set';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.Identifier, data: { name: 'Set' } };

new RuleTester().run('no-set', rule, {
  valid: ['Array', 'Object', 'let Set = 0; Set'],
  invalid: [
    { code: 'Set', errors: [{ ...error, column: 1 }] },
    { code: 'function f() { Set }', errors: [{ ...error, column: 16 }] },
  ],
});
