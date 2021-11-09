import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-arrow-functions';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.ArrowFunctionExpression, data: {} };

new RuleTester().run('no-arrow-functions', rule, {
  valid: ['function f() {}', 'const f = function() {}'],
  invalid: [
    { code: '() => 1', output: '(function() { return 1 })', errors: [{ ...error, column: 1 }] },
    { code: '() => {}', output: '(function() {})', errors: [{ ...error, column: 1 }] },
    {
      code: '() => this.data',
      output: '(function() { return this.data }.bind(this))',
      errors: [{ ...error, column: 1 }],
    },
    { code: 'a => a', output: '(function(a) { return a })', errors: [{ ...error, column: 1 }] },
    { code: '(a,  b) => a - b', output: '(function(a,  b) { return a - b })', errors: [{ ...error, column: 1 }] },
    {
      code: 'var fnRestParams = (param1, param2, ...rest) => { statements }',
      output: 'var fnRestParams = function(param1, param2, ...rest) { statements }',
      errors: [{ ...error, column: 20 }],
    },
    {
      code: 'var fnDefParams = (param1 = defaultValue1, param2, paramN = defaultValueN) => { statements }',
      output: 'var fnDefParams = function(param1 = defaultValue1, param2, paramN = defaultValueN) { statements }',
      errors: [{ ...error, column: 19 }],
    },
    {
      code: 'var fnDestructuring = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;',
      output: 'var fnDestructuring = function([a, b] = [1, 2], {x: c} = {x: a + b}) { return a + b + c };',
      errors: [{ ...error, column: 23 }],
    },
    {
      code: 'let square = n => ({ square: n * n });',
      output: 'let square = function(n) { return ({ square: n * n }) };',
      errors: [{ ...error, column: 14 }],
    },
    {
      code: `
var comment1 = a => /*comment*/ a;
var comment2 = a => /*
comment
*/ a;
var comment3 = a => // comment
a;
            `,
      output: `
var comment1 = function(a) { return /*comment*/ a };
var comment2 = function(a) { return (/*
comment
*/ a) };
var comment3 = function(a) { return (// comment
a) };
            `,
      errors: [
        { ...error, line: 2, column: 16 },
        { ...error, line: 3, column: 16 },
        { ...error, line: 6, column: 16 },
      ],
    },
    {
      code: `
var fnHasThis1 = () => {
    proc();
    return function() {}.bind(this);
}
var fnHasThis2 = () => {
    proc();
    this.proc()
}
            `,
      output: `
var fnHasThis1 = function() {
    proc();
    return function() {}.bind(this);
}.bind(this)
var fnHasThis2 = function() {
    proc();
    this.proc()
}.bind(this)
            `,
      errors: [
        { ...error, line: 2, column: 18 },
        { ...error, line: 6, column: 18 },
      ],
    },
    {
      code: `
class SubClass extends SuperClass {

    methodSub() {
        const f = () => {
            return super.methodSuper()
        }
        return f
    }
}
            `,
      output: null,
      errors: [{ ...error, line: 5, column: 19 }],
    },
    {
      code: `
const f = () => {
    return function () {
        return this
    }
}
            `,
      output: `
const f = function() {
    return function () {
        return this
    }
}
            `,
      errors: [{ ...error, line: 2, column: 11 }],
    },
    {
      code: `
const f = () => {
    return () => {
        return this
    }
}
            `,
      output: `
const f = function() {
    return () => {
        return this
    }
}.bind(this)
            `,
      errors: [
        { ...error, line: 2, column: 11 },
        { ...error, line: 3, column: 12 },
      ],
    },
    {
      code: `
const f = () =>
    777
            `,
      output: `
const f = function() { return (777) }
            `,
      errors: [{ ...error, line: 2, column: 11 }],
    },
    { code: 'async () => {}', output: '(async function() {})', errors: [{ ...error, column: 1 }] },
  ],
});
