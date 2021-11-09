import path from 'path';
import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-array-prototype-foreach';

const ruleId = 'no-array-prototype-foreach';
const error = {
  messageId: 'forbidden' as const,
  line: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Array.prototype.forEach' },
};

new RuleTester().run(ruleId, rule, {
  valid: [
    'forEach(() => {})',
    'foo.reverse()',
    'foo.forEach(() => {})',
    { code: 'forEach(() => {})', settings: { es: { aggressive: true } } },
    { code: 'foo.reverse()', settings: { es: { aggressive: true } } },
    { code: 'foo.forEach(() => {})', options: [{ aggressive: false }], settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { code: 'foo.forEach(() => {})', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
    {
      code: 'foo.forEach(() => {})',
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
    { filename, code: 'forEach(() => {})' },
    { filename, code: 'foo.reverse()' },
    { filename, code: 'foo.forEach(() => {})' },
    { filename, code: 'let foo = {}; foo.forEach(() => {})' },
    { filename, code: 'forEach(() => {})', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.reverse()', settings: { es: { aggressive: true } } },

    // `Array` is unknown type if tsconfig.json is not configured.
    { filename, code: 'let foo = []; foo.forEach(() => {})' },
    { filename, code: 'let foo = Array(); foo.forEach(() => {})' },
    { filename, code: 'function f<T extends any[]>(a: T) { a.forEach(() => {}) }' },
    { filename, code: 'function f<T extends string[] | number[]>(a: T) { a.forEach(() => {}) }' },
  ],
  invalid: [
    { filename, code: '[a, b, c].forEach(() => {})', errors: [{ ...error, column: 1 }] },
    {
      filename,
      code: 'let foo = []; foo.forEach(() => {})',
      errors: [{ ...error, column: 15 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'let foo = Array(); foo.forEach(() => {})',
      errors: [{ ...error, column: 20 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'function f<T extends any[]>(a: T) { a.forEach(() => {}) }',
      errors: [{ ...error, column: 37 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'function f<T extends string[] | number[]>(a: T) { a.forEach(() => {}) }',
      errors: [{ ...error, column: 51 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'foo.forEach(() => {})',
      errors: [{ ...error, column: 1 }],
      settings: { es: { aggressive: true } },
    },
  ],
});

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(`${ruleId} TS Full Type Information`, rule, {
  valid: [
    { filename, code: 'forEach(() => {})' },
    { filename, code: 'foo.reverse()' },
    { filename, code: 'foo.forEach(() => {})' },
    { filename, code: 'let foo = {}; foo.forEach(() => {})' },
    { filename, code: 'forEach(() => {})', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.reverse()', settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { filename, code: '[a, b, c].forEach(() => {})', errors: [{ ...error, column: 1 }] },
    { filename, code: 'let foo = []; foo.forEach(() => {})', errors: [{ ...error, column: 15 }] },
    { filename, code: 'let foo = Array(); foo.forEach(() => {})', errors: [{ ...error, column: 20 }] },
    { filename, code: 'function f<T extends any[]>(a: T) { a.forEach(() => {}) }', errors: [{ ...error, column: 37 }] },
    {
      filename,
      code: 'function f<T extends readonly any[]>(a: T) { a.forEach(() => {}) }',
      errors: [{ ...error, column: 46 }],
    },
    {
      filename,
      code: 'function f<T extends string[] | number[]>(a: T) { a.forEach(() => {}) }',
      errors: [{ ...error, column: 51 }],
    },
    {
      filename,
      code: 'foo.forEach(() => {})',
      errors: [{ ...error, column: 1 }],
      settings: { es: { aggressive: true } },
    },
  ],
});
