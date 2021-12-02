import path from 'path';

import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-function-prototype-bind';
import { RuleTester } from '../../tester';

const ruleId = 'no-function-prototype-bind';
const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Function.prototype.bind' },
};

new RuleTester().run(ruleId, rule, {
  valid: [
    'bind(this)',
    'foo.bind(this)',
    '(function fn(){}).name',
    '(()=>{}).name',
    { code: 'bind(this)', settings: { es: { aggressive: true } } },
    { code: '(function fn(){}).name', settings: { es: { aggressive: true } } },
    { code: '(()=>{}).name', settings: { es: { aggressive: true } } },
    { code: 'foo.bind(this)', options: [{ aggressive: false }], settings: { es: { aggressive: true } } },
    { code: '(function fn(){}).name', options: [{ aggressive: false }], settings: { es: { aggressive: true } } },
    { code: '(()=>{}).name', options: [{ aggressive: false }], settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { code: '(function fn(){}).bind(this)', errors: [{ ...error, column: 1 }] },
    { code: '(()=>{}).bind(this)', errors: [{ ...error, column: 1 }] },
    { code: 'foo.bind(this)', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
    { code: '(function fn(){}).bind(this)', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
    { code: '(()=>{}).bind(this)', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
    {
      code: 'foo.bind(this)',
      options: [{ aggressive: true }],
      errors: [{ ...error, column: 1 }],
      settings: { es: { aggressive: false } },
    },
    {
      code: '(function fn(){}).bind(this)',
      options: [{ aggressive: true }],
      errors: [{ ...error, column: 1 }],
      settings: { es: { aggressive: false } },
    },
    {
      code: '(()=>{}).bind(this)',
      options: [{ aggressive: true }],
      errors: [{ ...error, column: 1 }],
      settings: { es: { aggressive: false } },
    },
  ],
});

// -----------------------------------------------------------------------------
// TypeScript
// -----------------------------------------------------------------------------
const parser = require.resolve('@typescript-eslint/parser');
const tsconfigRootDir = path.resolve(__dirname, '../../fixtures');
const project = 'tsconfig.json';
const filename = path.join(tsconfigRootDir, 'test.ts');

new RuleTester({ parser }).run(`${ruleId} TS`, rule, {
  valid: [
    'bind(this)',
    'foo.bind(this)',
    '(function fn(){}).name',
    '(()=>{}).name',
    'let foo = {}; foo.bind(this)',
    { code: 'bind(this)', settings: { es: { aggressive: true } } },

    // `Function` is unknown type if tsconfig.json is not configured.
    'Object.assign.bind(this)',
    'let foo = Function(); foo.bind(this)',
    'let foo = String; foo.bind(this)',
  ],
  invalid: [
    { code: '(function fn(){}).bind(this)', errors: [{ ...error, column: 1 }] },
    { code: '(()=>{}).bind(this)', errors: [{ ...error, column: 1 }] },
    { code: 'let foo = function () {}; foo.bind(this)', errors: [{ ...error, column: 27 }] },
    { code: 'let foo = () => {}; foo.bind(this)', errors: [{ ...error, column: 21 }] },
    { code: 'function foo () {}; foo.bind(this)', errors: [{ ...error, column: 21 }] },
    { code: 'function f(a: () => number) { a.bind(this) }', errors: [{ ...error, column: 31 }] },
    { code: 'let foo = { fn () {} }; foo.fn.bind(this)', errors: [{ ...error, column: 25 }] },
    { code: 'class Foo {fn()}; const foo = new Foo(); foo.fn.bind(this)', errors: [{ ...error, column: 42 }] },
    { code: 'function f<T extends ((a: any) => T)>(a: T) { a.bind(this) }', errors: [{ ...error, column: 47 }] },
    {
      code: "function f<T extends ((a: any) => T) | 'union'>(a: T) { a.bind(this) }",
      errors: [{ ...error, column: 57 }],
    },
    { code: 'Object.assign.bind(this)', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
    {
      code: 'let foo = Function(); foo.bind(this)',
      errors: [{ ...error, column: 23 }],
      settings: { es: { aggressive: true } },
    },
    {
      code: 'let foo = String; foo.bind(this)',
      errors: [{ ...error, column: 19 }],
      settings: { es: { aggressive: true } },
    },
    { code: 'foo.bind(this)', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
  ],
});

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(`${ruleId} TS Full Types`, rule, {
  valid: [
    { filename, code: 'bind(this)' },
    { filename, code: 'foo.bind(this)' },
    { filename, code: '(function fn(){}).name' },
    { filename, code: '(()=>{}).name' },
    { filename, code: 'let foo = {}; foo.bind(this)' },
    { filename, code: 'bind(this)', settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { filename, code: '(function fn(){}).bind(this)', errors: [{ ...error, column: 1 }] },
    { filename, code: '(()=>{}).bind(this)', errors: [{ ...error, column: 1 }] },
    { filename, code: 'let foo = function () {}; foo.bind(this)', errors: [{ ...error, column: 27 }] },
    { filename, code: 'let foo = () => {}; foo.bind(this)', errors: [{ ...error, column: 21 }] },
    { filename, code: 'function foo () {}; foo.bind(this)', errors: [{ ...error, column: 21 }] },
    { filename, code: 'function f(a: () => number) { a.bind(this) }', errors: [{ ...error, column: 31 }] },
    { filename, code: 'let foo = { fn () {} }; foo.fn.bind(this)', errors: [{ ...error, column: 25 }] },
    { filename, code: 'Object.assign.bind(this)', errors: [{ ...error, column: 1 }] },
    { filename, code: 'class Foo {fn()}; const foo = new Foo(); foo.fn.bind(this)', errors: [{ ...error, column: 42 }] },
    { filename, code: 'let foo = Function(); foo.bind(this)', errors: [{ ...error, column: 23 }] },
    { filename, code: 'let foo = String; foo.bind(this)', errors: [{ ...error, column: 19 }] },
    {
      filename,
      code: 'function f<T extends ((a: any) => T)>(a: T) { a.bind(this) }',
      errors: [{ ...error, column: 47 }],
    },
    {
      filename,
      code: "function f<T extends ((a: any) => T) | 'union'>(a: T) { a.bind(this) }",
      errors: [{ ...error, column: 57 }],
    },
    { filename, code: 'foo.bind(this)', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
  ],
});
