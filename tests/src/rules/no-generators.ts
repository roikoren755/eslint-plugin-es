import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-generators';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.FunctionExpression, data: {} };

new RuleTester().run('no-generators', rule, {
  valid: ['function f() {}', 'yield = 0'],
  invalid: [
    { code: 'function* f() {}', errors: [{ ...error, column: 1, type: AST_NODE_TYPES.FunctionDeclaration }] },
    { code: '(function*() {})', errors: [{ ...error, column: 2 }] },
    { code: '({ *f() {} })', errors: [{ ...error, column: 6 }] },
    { code: 'class A { *f() {} }', errors: [{ ...error, column: 13 }] },
    { code: 'class A { static *f() {} }', errors: [{ ...error, column: 20 }] },
  ],
});
