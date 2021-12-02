import path from 'path';

import type { TSESLint } from '@typescript-eslint/experimental-utils';
import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-array-prototype-flat';
import { RuleTester } from '../../tester';

const ruleId = 'no-array-prototype-flat';
const error = (map?: boolean): TSESLint.TestCaseError<'forbidden'> => ({
  messageId: 'forbidden',
  line: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: `Array.prototype.flat${map ? 'Map' : ''}` },
});

new RuleTester().run(ruleId, rule, {
  valid: [
    'flat(1)',
    'flatMap(() => {})',
    'foo.reverse()',
    'foo.flat(1)',
    'foo.flatMap(() => {})',
    { code: 'flat(1)', settings: { es: { aggressive: true } } },
    { code: 'flatMap(() => {})', settings: { es: { aggressive: true } } },
    { code: 'foo.reverse()', settings: { es: { aggressive: true } } },
    { code: 'foo.flat(1)', options: [{ aggressive: false }], settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { code: 'foo.flat(1)', errors: [{ ...error(), column: 1 }], settings: { es: { aggressive: true } } },
    { code: 'foo.flatMap(() => {})', errors: [{ ...error(true), column: 1 }], settings: { es: { aggressive: true } } },
    {
      code: 'foo.flat(1)',
      options: [{ aggressive: true }],
      errors: [{ ...error(), column: 1 }],
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
    { filename, code: 'flat(1)' },
    { filename, code: 'flatMap(() => {})' },
    { filename, code: 'foo.reverse()' },
    { filename, code: 'foo.flat(1)' },
    { filename, code: 'foo.flatMap(() => {})' },
    { filename, code: 'let foo = {}; foo.flat(1)' },
    { filename, code: 'let foo = {}; foo.flatMap(() => {})' },
    { filename, code: 'flat(1)', settings: { es: { aggressive: true } } },
    { filename, code: 'flatMap(() => {})', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.reverse()', settings: { es: { aggressive: true } } },

    // `Array` is unknown type if tsconfig.json is not configured.
    { filename, code: 'let foo = []; foo.flat(1)' },
    { filename, code: 'let foo = Array(); foo.flat(1)' },
    { filename, code: 'function f<T extends any[]>(a: T) { a.flat(1) }' },
    { filename, code: 'function f<T extends string[] | number[]>(a: T) { a.flat(1) }' },
  ],
  invalid: [
    { filename, code: '[a, b, c].flat(1)', errors: [{ ...error(), column: 1 }] },
    { filename, code: '[a, b, c].flatMap(() => {})', errors: [{ ...error(true), column: 1 }] },
    {
      filename,
      code: 'let foo = []; foo.flat(1)',
      errors: [{ ...error(), column: 15 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'let foo = Array(); foo.flat(1)',
      errors: [{ ...error(), column: 20 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'function f<T extends any[]>(a: T) { a.flat(1) }',
      errors: [{ ...error(), column: 37 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'function f<T extends string[] | number[]>(a: T) { a.flat(1) }',
      errors: [{ ...error(), column: 51 }],
      settings: { es: { aggressive: true } },
    },
    { filename, code: 'foo.flat(1)', errors: [{ ...error(), column: 1 }], settings: { es: { aggressive: true } } },
  ],
});

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(`${ruleId} TS Full Type Information`, rule, {
  valid: [
    { filename, code: 'flat(1)' },
    { filename, code: 'flatMap(() => {})' },
    { filename, code: 'foo.reverse()' },
    { filename, code: 'foo.flat(1)' },
    { filename, code: 'foo.flatMap(() => {})' },
    { filename, code: 'let foo = {}; foo.flat(1)' },
    { filename, code: 'let foo = {}; foo.flatMap(() => {})' },
    { filename, code: 'flat(1)', settings: { es: { aggressive: true } } },
    { filename, code: 'flatMap(() => {})', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.reverse()', settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { filename, code: '[a, b, c].flat(1)', errors: [{ ...error(), column: 1 }] },
    { filename, code: '[a, b, c].flatMap(() => {})', errors: [{ ...error(true), column: 1 }] },
    { filename, code: 'let foo = []; foo.flat(1)', errors: [{ ...error(), column: 15 }] },
    { filename, code: 'let foo = []; foo.flatMap(() => {})', errors: [{ ...error(true), column: 15 }] },
    { filename, code: 'let foo = Array(); foo.flat(1)', errors: [{ ...error(), column: 20 }] },
    { filename, code: 'function f<T extends any[]>(a: T) { a.flat(1) }', errors: [{ ...error(), column: 37 }] },
    { filename, code: 'function f<T extends readonly any[]>(a: T) { a.flat(1) }', errors: [{ ...error(), column: 46 }] },
    {
      filename,
      code: 'function f<T extends string[] | number[]>(a: T) { a.flat(1) }',
      errors: [{ ...error(), column: 51 }],
    },
    { filename, code: 'foo.flat(1)', errors: [{ ...error(), column: 1 }], settings: { es: { aggressive: true } } },
    {
      filename,
      code: 'foo.flatMap(() => {})',
      errors: [{ ...error(true), column: 1 }],
      settings: { es: { aggressive: true } },
    },
  ],
});
