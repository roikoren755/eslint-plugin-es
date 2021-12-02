import rule from '../../../src/rules/no-trailing-function-commas';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, data: {} };

new RuleTester().run('no-trailing-function-commas', rule, {
  valid: [
    '[1,]',
    '({a:1,})',
    'const [a,] = ary',
    'const {a,} = obj',
    'f()',
    'f(a)',
    'new F',
    'new F(a)',
    'function f() {}',
    'function f(a) {}',
  ],
  invalid: [
    { code: 'function f(a,) {}', output: 'function f(a) {}', errors: [{ ...error, column: 13 }] },
    { code: '(function(a,) {})', output: '(function(a) {})', errors: [{ ...error, column: 12 }] },
    { code: '(a,) => {}', output: '(a) => {}', errors: [{ ...error, column: 3 }] },
    { code: '({ f(a,) {} })', output: '({ f(a) {} })', errors: [{ ...error, column: 7 }] },
    { code: 'class A { f(a,) {} }', output: 'class A { f(a) {} }', errors: [{ ...error, column: 14 }] },
    { code: '(class { f(a,) {} })', output: '(class { f(a) {} })', errors: [{ ...error, column: 13 }] },
    { code: 'f(a,)', output: 'f(a)', errors: [{ ...error, column: 4 }] },
    { code: 'new F(a,)', output: 'new F(a)', errors: [{ ...error, column: 8 }] },
  ],
});
