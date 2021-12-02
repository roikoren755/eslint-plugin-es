import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-symbol';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.Identifier, data: { name: 'Symbol' } };

new RuleTester().run('no-symbol', rule, {
  valid: ['Array', 'Object', 'let Symbol = 0; Symbol'],
  invalid: [
    { code: 'Symbol', errors: [{ ...error, column: 1 }] },
    { code: 'function f() { Symbol }', errors: [{ ...error, column: 16 }] },
  ],
});
