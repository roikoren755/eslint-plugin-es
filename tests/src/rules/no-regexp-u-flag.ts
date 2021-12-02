import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-regexp-u-flag';
import { RuleTester } from '../../tester';

const baseError = { messageId: 'forbidden' as const, line: 1, column: 1, data: {} };
const literalError = { ...baseError, type: AST_NODE_TYPES.Literal };
const newError = { ...baseError, type: AST_NODE_TYPES.NewExpression };

new RuleTester().run('no-regexp-u-flag', rule, {
  valid: [
    '/foo/gimsy',
    'a\n/b/s',
    "new RegExp('foo', 'gimsy')",
    "new RegExp('foo')",
    "new RegExp('foo', flags)",
    "const flags = 'gimsy'; new RegExp('foo', flags)",
  ],
  invalid: [
    { code: '/foo/u', errors: [literalError] },
    { code: '/foo/gimsuy', errors: [literalError] },
    { code: "new RegExp('foo', 'u')", errors: [newError] },
    { code: "new RegExp('foo', 'gimsuy')", errors: [newError] },
    { code: "const flags = 'u'; new RegExp('foo', flags)", errors: [{ ...newError, column: 20 }] },
  ],
});
