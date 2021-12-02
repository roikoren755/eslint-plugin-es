import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-reflect';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.Identifier, data: { name: 'Reflect' } };

new RuleTester().run('no-reflect', rule, {
  valid: ['Array', 'Object', 'let Reflect = 0; Reflect'],
  invalid: [
    { code: 'Reflect', errors: [{ ...error, column: 1 }] },
    { code: 'function f() { Reflect }', errors: [{ ...error, column: 16 }] },
  ],
});
