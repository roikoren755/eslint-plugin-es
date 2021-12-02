import path from 'path';

import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-array-prototype-copywithin';
import { RuleTester } from '../../tester';

const ruleId = 'no-array-prototype-copywithin';
const error = {
  messageId: 'forbidden' as const,
  line: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Array.prototype.copyWithin' },
};

new RuleTester().run(ruleId, rule, {
  valid: [
    'copyWithin(0, 1, 2)',
    'foo.reverse()',
    'foo.copyWithin(0, 1, 2)',
    { code: 'copyWithin(0, 1, 2)', settings: { es: { aggressive: true } } },
    { code: 'foo.reverse()', settings: { es: { aggressive: true } } },
    { code: 'foo.copyWithin(0, 1, 2)', options: [{ aggressive: false }], settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { code: 'foo.copyWithin(0, 1, 2)', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
    {
      code: 'foo.copyWithin(0, 1, 2)',
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
    { filename, code: 'copyWithin(0, 1, 2)' },
    { filename, code: 'foo.reverse()' },
    { filename, code: 'foo.copyWithin(0, 1, 2)' },
    { filename, code: 'let foo = {}; foo.copyWithin(0, 1, 2)' },
    { filename, code: 'copyWithin(0, 1, 2)', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.reverse()', settings: { es: { aggressive: true } } },

    // `Array` is unknown type if tsconfig.json is not configured.
    { filename, code: 'let foo = []; foo.copyWithin(0, 1, 2)' },
    { filename, code: 'let foo = Array(); foo.copyWithin(0, 1, 2)' },
    { filename, code: 'function f<T extends any[]>(a: T) { a.copyWithin(0, 1, 2) }' },
    { filename, code: 'function f<T extends string[] | number[]>(a: T) { a.copyWithin(0, 1, 2) }' },
  ],
  invalid: [
    { filename, code: '[a, b, c].copyWithin(0, 1, 2)', errors: [{ ...error, column: 1 }] },
    {
      filename,
      code: 'let foo = []; foo.copyWithin(0, 1, 2)',
      errors: [{ ...error, column: 15 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'let foo = Array(); foo.copyWithin(0, 1, 2)',
      errors: [{ ...error, column: 20 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'function f<T extends any[]>(a: T) { a.copyWithin(0, 1, 2) }',
      errors: [{ ...error, column: 37 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'function f<T extends string[] | number[]>(a: T) { a.copyWithin(0, 1, 2) }',
      errors: [{ ...error, column: 51 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'foo.copyWithin(0, 1, 2)',
      errors: [{ ...error, column: 1 }],
      settings: { es: { aggressive: true } },
    },
  ],
});

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(`${ruleId} TS Full Type Information`, rule, {
  valid: [
    { filename, code: 'copyWithin(0, 1, 2)' },
    { filename, code: 'foo.reverse()' },
    { filename, code: 'foo.copyWithin(0, 1, 2)' },
    { filename, code: 'let foo = {}; foo.copyWithin(0, 1, 2)' },
    { filename, code: 'copyWithin(0, 1, 2)', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.reverse()', settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { filename, code: '[a, b, c].copyWithin(0, 1, 2)', errors: [{ ...error, column: 1 }] },
    { filename, code: 'let foo = []; foo.copyWithin(0, 1, 2)', errors: [{ ...error, column: 15 }] },
    { filename, code: 'let foo = Array(); foo.copyWithin(0, 1, 2)', errors: [{ ...error, column: 20 }] },
    {
      filename,
      code: 'function f<T extends any[]>(a: T) { a.copyWithin(0, 1, 2) }',
      errors: [{ ...error, column: 37 }],
    },
    {
      filename,
      code: 'function f<T extends string[] | number[]>(a: T) { a.copyWithin(0, 1, 2) }',
      errors: [{ ...error, column: 51 }],
    },
    {
      filename,
      code: 'foo.copyWithin(0, 1, 2)',
      errors: [{ ...error, column: 1 }],
      settings: { es: { aggressive: true } },
    },
  ],
});
