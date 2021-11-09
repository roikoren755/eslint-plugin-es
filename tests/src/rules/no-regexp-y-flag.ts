import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-regexp-y-flag';

const baseError = { messageId: 'forbidden' as const, line: 1, column: 1, data: {} };
const literalError = { ...baseError, type: AST_NODE_TYPES.Literal };
const newError = { ...baseError, type: AST_NODE_TYPES.NewExpression };

new RuleTester().run('no-regexp-y-flag', rule, {
  valid: [
    '/foo/gimsu',
    'a\n/b/s',
    "new RegExp('foo', 'gimsu')",
    "new RegExp('foo')",
    "new RegExp('foo', flags)",
    "const flags = 'gimsu'; new RegExp('foo', flags)",
  ],
  invalid: [
    { code: '/foo/y', errors: [literalError] },
    { code: '/foo/gimsuy', errors: [literalError] },
    { code: "new RegExp('foo', 'y')", errors: [newError] },
    { code: "new RegExp('foo', 'gimsuy')", errors: [newError] },
    { code: "const flags = 'y'; new RegExp('foo', flags)", errors: [{ ...newError, column: 20 }] },
  ],
});
