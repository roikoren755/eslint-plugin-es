import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-bigint';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.Literal, data: {} };

new RuleTester().run('no-bigint', rule, {
  valid: ['100'],
  invalid: [
    { code: '100n', errors: [{ ...error, column: 1 }] },
    { code: '({ 100n: null })', errors: [{ ...error, column: 4 }] },
    { code: '({ 100n() {} })', errors: [{ ...error, column: 4 }] },
    { code: '({ get 100n() {} })', errors: [{ ...error, column: 8 }] },
    { code: 'class A { 100n() {} }', errors: [{ ...error, column: 11 }] },
    { code: 'class A { get 100n() {} }', errors: [{ ...error, column: 15 }] },
    { code: 'BigInt', errors: [{ ...error, column: 1, type: AST_NODE_TYPES.Identifier }] },
    { code: 'BigInt64Array', errors: [{ ...error, column: 1, type: AST_NODE_TYPES.Identifier }] },
    { code: 'BigUint64Array', errors: [{ ...error, column: 1, type: AST_NODE_TYPES.Identifier }] },
  ],
});
