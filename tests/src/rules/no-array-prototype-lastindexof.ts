import path from 'path';
import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-array-prototype-lastindexof';

const ruleId = 'no-array-prototype-lastindexof';
const error = {
  messageId: 'forbidden' as const,
  line: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Array.prototype.lastIndexOf' },
};

new RuleTester().run(ruleId, rule, {
  valid: [
    'lastIndexOf(0)',
    'foo.reverse()',
    'foo.lastIndexOf(0)',
    { code: 'lastIndexOf(0)', settings: { es: { aggressive: true } } },
    { code: 'foo.reverse()', settings: { es: { aggressive: true } } },
    { code: 'foo.lastIndexOf(0)', options: [{ aggressive: false }], settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { code: 'foo.lastIndexOf(0)', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
    {
      code: 'foo.lastIndexOf(0)',
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
    { filename, code: 'lastIndexOf(0)' },
    { filename, code: 'foo.reverse()' },
    { filename, code: 'foo.lastIndexOf(0)' },
    { filename, code: 'let foo = {}; foo.lastIndexOf(0)' },
    { filename, code: 'lastIndexOf(0)', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.reverse()', settings: { es: { aggressive: true } } },

    // `Array` is unknown type if tsconfig.json is not configured.
    { filename, code: 'let foo = []; foo.lastIndexOf(0)' },
    { filename, code: 'let foo = Array(); foo.lastIndexOf(0)' },
    { filename, code: 'function f<T extends any[]>(a: T) { a.lastIndexOf(0) }' },
    { filename, code: 'function f<T extends string[] | number[]>(a: T) { a.lastIndexOf(0) }' },
  ],
  invalid: [
    { filename, code: '[a, b, c].lastIndexOf(0)', errors: [{ ...error, column: 1 }] },
    {
      filename,
      code: 'let foo = []; foo.lastIndexOf(0)',
      errors: [{ ...error, column: 15 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'let foo = Array(); foo.lastIndexOf(0)',
      errors: [{ ...error, column: 20 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'function f<T extends any[]>(a: T) { a.lastIndexOf(0) }',
      errors: [{ ...error, column: 37 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'function f<T extends string[] | number[]>(a: T) { a.lastIndexOf(0) }',
      errors: [{ ...error, column: 51 }],
      settings: { es: { aggressive: true } },
    },
    { filename, code: 'foo.lastIndexOf(0)', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
  ],
});

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(`${ruleId} TS Full Type Information`, rule, {
  valid: [
    { filename, code: 'lastIndexOf(0)' },
    { filename, code: 'foo.reverse()' },
    { filename, code: 'foo.lastIndexOf(0)' },
    { filename, code: 'let foo = {}; foo.lastIndexOf(0)' },
    { filename, code: 'lastIndexOf(0)', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.reverse()', settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { filename, code: '[a, b, c].lastIndexOf(0)', errors: [{ ...error, column: 1 }] },
    { filename, code: 'let foo = []; foo.lastIndexOf(0)', errors: [{ ...error, column: 15 }] },
    { filename, code: 'let foo = Array(); foo.lastIndexOf(0)', errors: [{ ...error, column: 20 }] },
    { filename, code: 'function f<T extends any[]>(a: T) { a.lastIndexOf(0) }', errors: [{ ...error, column: 37 }] },
    {
      filename,
      code: 'function f<T extends readonly any[]>(a: T) { a.lastIndexOf(0) }',
      errors: [{ ...error, column: 46 }],
    },
    {
      filename,
      code: 'function f<T extends string[] | number[]>(a: T) { a.lastIndexOf(0) }',
      errors: [{ ...error, column: 51 }],
    },
    { filename, code: 'foo.lastIndexOf(0)', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
  ],
});
