import path from 'path';

import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-array-prototype-reduce';
import { RuleTester } from '../../tester';

const ruleId = 'no-array-prototype-reduce';
const error = {
  messageId: 'forbidden' as const,
  line: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Array.prototype.reduce' },
};

new RuleTester().run(ruleId, rule, {
  valid: [
    'reduce(() => {})',
    'foo.reverse()',
    'foo.reduce(() => {})',
    { code: 'reduce(() => {})', settings: { es: { aggressive: true } } },
    { code: 'foo.reverse()', settings: { es: { aggressive: true } } },
    { code: 'foo.reduce(() => {})', options: [{ aggressive: false }], settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { code: 'foo.reduce(() => {})', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
    {
      code: 'foo.reduce(() => {})',
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
    { filename, code: 'reduce(() => {})' },
    { filename, code: 'foo.reverse()' },
    { filename, code: 'foo.reduce(() => {})' },
    { filename, code: 'let foo = {}; foo.reduce(() => {})' },
    { filename, code: 'reduce(() => {})', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.reverse()', settings: { es: { aggressive: true } } },

    // `Array` is unknown type if tsconfig.json is not configured.
    { filename, code: 'let foo = []; foo.reduce(() => {})' },
    { filename, code: 'let foo = Array(); foo.reduce(() => {})' },
    { filename, code: 'function f<T extends any[]>(a: T) { a.reduce(() => {}) }' },
    { filename, code: 'function f<T extends string[] | number[]>(a: T) { a.reduce(() => {}) }' },
  ],
  invalid: [
    { filename, code: '[a, b, c].reduce(() => {})', errors: [{ ...error, column: 1 }] },
    {
      filename,
      code: 'let foo = []; foo.reduce(() => {})',
      errors: [{ ...error, column: 15 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'let foo = Array(); foo.reduce(() => {})',
      errors: [{ ...error, column: 20 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'function f<T extends any[]>(a: T) { a.reduce(() => {}) }',
      errors: [{ ...error, column: 37 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'function f<T extends string[] | number[]>(a: T) { a.reduce(() => {}) }',
      errors: [{ ...error, column: 51 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'foo.reduce(() => {})',
      errors: [{ ...error, column: 1 }],
      settings: { es: { aggressive: true } },
    },
  ],
});

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(`${ruleId} TS Full Type Information`, rule, {
  valid: [
    { filename, code: 'reduce(() => {})' },
    { filename, code: 'foo.reverse()' },
    { filename, code: 'foo.reduce(() => {})' },
    { filename, code: 'let foo = {}; foo.reduce(() => {})' },
    { filename, code: 'reduce(() => {})', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.reverse()', settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { filename, code: '[a, b, c].reduce(() => {})', errors: [{ ...error, column: 1 }] },
    { filename, code: 'let foo = []; foo.reduce(() => {})', errors: [{ ...error, column: 15 }] },
    { filename, code: 'let foo = Array(); foo.reduce(() => {})', errors: [{ ...error, column: 20 }] },
    { filename, code: 'function f<T extends any[]>(a: T) { a.reduce(() => {}) }', errors: [{ ...error, column: 37 }] },
    {
      filename,
      code: 'function f<T extends readonly any[]>(a: T) { a.reduce(() => {}) }',
      errors: [{ ...error, column: 46 }],
    },
    {
      filename,
      code: 'function f<T extends string[] | number[]>(a: T) { a.reduce(() => {}) }',
      errors: [{ ...error, column: 51 }],
    },
    {
      filename,
      code: 'foo.reduce(() => {})',
      errors: [{ ...error, column: 1 }],
      settings: { es: { aggressive: true } },
    },
  ],
});
