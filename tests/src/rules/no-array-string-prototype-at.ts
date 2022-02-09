import path from 'path';

import { AST_NODE_TYPES } from '@typescript-eslint/types';
import type { TSESLint } from '@typescript-eslint/utils';

import rule from '../../../src/rules/no-array-string-prototype-at';
import { RuleTester } from '../../tester';

const error = (name: string): TSESLint.TestCaseError<'forbidden'> => ({
  messageId: 'forbidden',
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: `${name}.prototype.at` },
});
const ruleId = 'no-array-string-prototype-at';

new RuleTester().run(ruleId, rule, {
  valid: [
    'at(-1)',
    'foo.reverse()',
    'foo.at(-1)',
    { code: 'at(-1)', settings: { es: { aggressive: true } } },
    { code: 'foo.reverse()', settings: { es: { aggressive: true } } },
    { code: 'foo.at(-1)', options: [{ aggressive: false }], settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { code: 'foo.at(-1)', errors: [{ ...error('Array') }], settings: { es: { aggressive: true } } },
    {
      code: 'foo.at(-1)',
      options: [{ aggressive: true }],
      errors: [{ ...error('Array') }],
      settings: { es: { aggressive: false } },
    },
    { code: '[1,2,3].at(-1)', errors: [{ ...error('Array') }] },
    { code: "'123'.at(-1)", errors: [{ ...error('String') }] },
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
    { filename, code: 'at(-1)' },
    { filename, code: 'foo.reverse()' },
    { filename, code: 'foo.at(-1)' },
    { filename, code: 'let foo = {}; foo.at(-1)' },
    { filename, code: 'at(-1)', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.reverse()', settings: { es: { aggressive: true } } },

    // `Array` is unknown type if tsconfig.json is not configured.
    { filename, code: 'let foo = []; foo.at(-1)' },
    { filename, code: 'let foo = Array(); foo.at(-1)' },
    { filename, code: 'function f<T extends any[]>(a: T) { a.at(-1) }' },
    { filename, code: 'function f<T extends string[] | number[]>(a: T) { a.at(-1) }' },
  ],
  invalid: [
    { filename, code: '[1, 2, 3].at(-1)', errors: [{ ...error('Array') }] },
    { filename, code: "'123'.at(-1)", errors: [{ ...error('String') }] },
    {
      filename,
      code: 'let foo = []; foo.at(-1)',
      errors: [{ ...error('Array'), column: 15 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'let foo = Array(); foo.at(-1)',
      errors: [{ ...error('Array'), column: 20 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'function f<T extends any[]>(a: T) { a.at(-1) }',
      errors: [{ ...error('Array'), column: 37 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'function f<T extends string[] | number[]>(a: T) { a.at(-1) }',
      errors: [{ ...error('Array'), column: 51 }],
      settings: { es: { aggressive: true } },
    },
    { filename, code: 'foo.at(-1)', errors: [{ ...error('Array') }], settings: { es: { aggressive: true } } },
  ],
});

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(`${ruleId} TS Full Type Information`, rule, {
  valid: [
    { filename, code: 'at(-1)' },
    { filename, code: 'foo.reverse()' },
    { filename, code: 'foo.at(-1)' },
    { filename, code: 'let foo = {}; foo.at(-1)' },
    { filename, code: 'at(-1)', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.reverse()', settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { filename, code: '[1, 2, 3].at(-1)', errors: [{ ...error('Array') }] },
    { filename, code: "'123'.at(-1)", errors: [{ ...error('String') }] },
    { filename, code: 'let foo = []; foo.at(-1)', errors: [{ ...error('Array'), column: 15 }] },
    { filename, code: 'let foo = Array(); foo.at(-1)', errors: [{ ...error('Array'), column: 20 }] },
    { filename, code: 'function f<T extends any[]>(a: T) { a.at(-1) }', errors: [{ ...error('Array'), column: 37 }] },
    {
      filename,
      code: 'function f<T extends readonly any[]>(a: T) { a.at(-1) }',
      errors: [{ ...error('Array'), column: 46 }],
    },
    {
      filename,
      code: 'function f<T extends string[] | number[]>(a: T) { a.at(-1) }',
      errors: [{ ...error('Array'), column: 51 }],
    },
    { filename, code: 'foo.at(-1)', errors: [{ ...error('Array') }], settings: { es: { aggressive: true } } },
    { filename, code: "let foo = 'str'; foo.at(-1)", errors: [{ ...error('String'), column: 18 }] },
    { filename, code: 'let foo = String(42); foo.at(-1)', errors: [{ ...error('String'), column: 23 }] },
    { filename, code: 'function f<T extends string>(a: T) { a.at(-1) }', errors: [{ ...error('String'), column: 38 }] },
    {
      filename,
      code: "function f<T extends 'a' | 'b'>(a: T) { a.at(-1) }",
      errors: [{ ...error('String'), column: 41 }],
    },
    {
      filename,
      code: "function f<T extends 'a' | 'b' | 'c'>(a: T) { a.at(-1) }",
      errors: [{ ...error('String'), column: 47 }],
    },
    { filename, code: 'let foo = new Int8Array(42); foo.at(-1)', errors: [{ ...error('Int8Array'), column: 30 }] },
    {
      filename,
      code: 'function f<T extends Int8Array>(a: T) { a.at(-1) }',
      errors: [{ ...error('Int8Array'), column: 41 }],
    },
    { filename, code: 'let foo = new Uint8Array(42); foo.at(-1)', errors: [{ ...error('Uint8Array'), column: 31 }] },
    {
      filename,
      code: 'function f<T extends Uint8Array>(a: T) { a.at(-1) }',
      errors: [{ ...error('Uint8Array'), column: 42 }],
    },
    {
      filename,
      code: 'let foo = new Uint8ClampedArray(42); foo.at(-1)',
      errors: [{ ...error('Uint8ClampedArray'), column: 38 }],
    },
    {
      filename,
      code: 'function f<T extends Uint8ClampedArray>(a: T) { a.at(-1) }',
      errors: [{ ...error('Uint8ClampedArray'), column: 49 }],
    },
    { filename, code: 'let foo = new Int16Array(42); foo.at(-1)', errors: [{ ...error('Int16Array'), column: 31 }] },
    {
      filename,
      code: 'function f<T extends Int16Array>(a: T) { a.at(-1) }',
      errors: [{ ...error('Int16Array'), column: 42 }],
    },
    { filename, code: 'let foo = new Uint16Array(42); foo.at(-1)', errors: [{ ...error('Uint16Array'), column: 32 }] },
    {
      filename,
      code: 'function f<T extends Uint16Array>(a: T) { a.at(-1) }',
      errors: [{ ...error('Uint16Array'), column: 43 }],
    },
    { filename, code: 'let foo = new Int32Array(42); foo.at(-1)', errors: [{ ...error('Int32Array'), column: 31 }] },
    {
      filename,
      code: 'function f<T extends Int32Array>(a: T) { a.at(-1) }',
      errors: [{ ...error('Int32Array'), column: 42 }],
    },
    { filename, code: 'let foo = new Uint32Array(42); foo.at(-1)', errors: [{ ...error('Uint32Array'), column: 32 }] },
    {
      filename,
      code: 'function f<T extends Uint32Array>(a: T) { a.at(-1) }',
      errors: [{ ...error('Uint32Array'), column: 43 }],
    },
    { filename, code: 'let foo = new Float32Array(42); foo.at(-1)', errors: [{ ...error('Float32Array'), column: 33 }] },
    {
      filename,
      code: 'function f<T extends Float32Array>(a: T) { a.at(-1) }',
      errors: [{ ...error('Float32Array'), column: 44 }],
    },
    { filename, code: 'let foo = new Float64Array(42); foo.at(-1)', errors: [{ ...error('Float64Array'), column: 33 }] },
    {
      filename,
      code: 'function f<T extends Float64Array>(a: T) { a.at(-1) }',
      errors: [{ ...error('Float64Array'), column: 44 }],
    },
    {
      filename,
      code: 'let foo = new BigInt64Array(42); foo.at(-1)',
      errors: [{ ...error('BigInt64Array'), column: 34 }],
    },
    {
      filename,
      code: 'function f<T extends BigInt64Array>(a: T) { a.at(-1) }',
      errors: [{ ...error('BigInt64Array'), column: 45 }],
    },
    {
      filename,
      code: 'let foo = new BigUint64Array(42); foo.at(-1)',
      errors: [{ ...error('BigUint64Array'), column: 35 }],
    },
    {
      filename,
      code: 'function f<T extends BigUint64Array>(a: T) { a.at(-1) }',
      errors: [{ ...error('BigUint64Array'), column: 46 }],
    },
  ],
});
