import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-destructuring';

const baseError = { messageId: 'forbidden' as const, line: 1, data: {} };
const arrayError = { ...baseError, type: AST_NODE_TYPES.ArrayPattern };
const objectError = { ...baseError, type: AST_NODE_TYPES.ObjectPattern };

new RuleTester().run('no-destructuring', rule, {
  valid: ['({})', '({a: 1})', '[]', '[1]', 'var a = {a}'],
  invalid: [
    { code: 'var [a, {b: []}, [c], [d] = ary1, ...e] = ary2', errors: [{ ...arrayError, column: 5 }] },
    { code: 'let [a, {b: []}, [c], [d] = ary1, ...e] = ary2', errors: [{ ...arrayError, column: 5 }] },
    { code: 'const [a, {b: []}, [c], [d] = ary1, ...e] = ary2', errors: [{ ...arrayError, column: 7 }] },
    { code: '([a, {b: []}, [c], [d] = ary1, ...e] = ary2)', errors: [{ ...arrayError, column: 2 }] },
    { code: 'for ([a, {b: []}, [c], [d] = ary1, ...e] in ary2);', errors: [{ ...arrayError, column: 6 }] },
    { code: 'for ([a, {b: []}, [c], [d] = ary1, ...e] of ary2);', errors: [{ ...arrayError, column: 6 }] },
    { code: 'function f([a, {b: []}, [c], [d] = ary1, ...e]) {}', errors: [{ ...arrayError, column: 12 }] },
    { code: 'function f([a, {b: []}, [c], [d] = ary1, ...e] = ary2) {}', errors: [{ ...arrayError, column: 12 }] },
    { code: 'function f(...[a, {b: []}, [c], [d] = ary1, ...e]) {}', errors: [{ ...arrayError, column: 15 }] },
    { code: 'var { a: {b}, c: [d, {e}, ...f], ...g} = obj', errors: [{ ...objectError, column: 5 }] },
    { code: 'let { a: {b}, c: [d, {e}, ...f], ...g} = obj', errors: [{ ...objectError, column: 5 }] },
    { code: 'const { a: {b}, c: [d, {e}, ...f], ...g} = obj', errors: [{ ...objectError, column: 7 }] },
    { code: '({ a: {b}, c: [d, {e}, ...f], ...g} = obj)', errors: [{ ...objectError, column: 2 }] },
    { code: 'for ({ a: {b}, c: [d, {e}, ...f], ...g} in obj);', errors: [{ ...objectError, column: 6 }] },
    { code: 'for ({ a: {b}, c: [d, {e}, ...f], ...g} of obj);', errors: [{ ...objectError, column: 6 }] },
    { code: 'function f({ a: {b}, c: [d, {e}, ...f], ...g}) {}', errors: [{ ...objectError, column: 12 }] },
    { code: 'function f({ a: {b}, c: [d, {e}, ...f], ...g} = obj) {}', errors: [{ ...objectError, column: 12 }] },
    { code: 'function f(...{ a: {b}, c: [d, {e}, ...f], ...g}) {}', errors: [{ ...objectError, column: 15 }] },
  ],
});
