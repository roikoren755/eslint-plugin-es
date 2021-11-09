import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-block-scoped-functions';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.FunctionDeclaration, data: {} };

new RuleTester().run('no-block-scoped-functions', rule, {
  valid: [
    'function f() {}',
    { code: 'function f() {}', parserOptions: { sourceType: 'module' } },
    'function wrap() { function f() {} }',
    '(function() { function f() {} })()',
    '(() => { function f() {} })()',
    '({ wrap() { function f() {} } })',
    'class A { wrap() { function f() {} } }',
    '(class { wrap() { function f() {} } })',
    '(() => function f() {})()',
    'if (a) { (function f() {}) }',
    'if (a) { (() => {}) }',
  ],
  invalid: [
    { code: '{ function f() {} }', errors: [{ ...error, column: 3 }] },
    { code: 'if (a) { function f() {} }', errors: [{ ...error, column: 10 }] },
    { code: 'if (a) ; else { function f() {} }', errors: [{ ...error, column: 17 }] },
    { code: 'function wrap() { if (a) { function f() {} } }', errors: [{ ...error, column: 28 }] },
  ],
});
