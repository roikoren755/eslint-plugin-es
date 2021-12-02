import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-default-parameters';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.AssignmentPattern, data: {} };

new RuleTester().run('no-default-parameters', rule, {
  valid: [
    'function f(a, ...rest) {}',
    'const f = function(a, ...rest) {}',
    'const f = (a, ...rest) => {}',
    '({ method(a, ...rest) {} })',
    'class A { method(a, ...rest) {} }',
    '(class { method(a, ...rest) {} })',
    'var a = 1',
    'var {a = 0} = obj',
    'var [a = 0] = ary',
    '({a = 0} = obj)',
    '([a = 0] = ary)',
    'function f({a = 0}) {}',
    'function f([a = 0]) {}',
  ],
  invalid: [
    { code: 'async function f(a = 0) {}', errors: [{ ...error, column: 18 }] },
    { code: 'const f = async function(a = 0) {}', errors: [{ ...error, column: 26 }] },
    { code: 'const f = async (a = 0) => {}', errors: [{ ...error, column: 18 }] },
    { code: '({ async method(a = 0) {} })', errors: [{ ...error, column: 17 }] },
    { code: 'class A { async method(a = 0) {} }', errors: [{ ...error, column: 24 }] },
    { code: '(class { async method(a = 0) {} })', errors: [{ ...error, column: 23 }] },
    { code: 'async function f({a} = 0) {}', errors: [{ ...error, column: 18 }] },
    { code: 'async function f([a] = 0) {}', errors: [{ ...error, column: 18 }] },
  ],
});
