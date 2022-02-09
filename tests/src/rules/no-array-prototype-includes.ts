import path from 'path';

import { AST_NODE_TYPES } from '@typescript-eslint/types';
import type { TSESLint } from '@typescript-eslint/utils';

import rule from '../../../src/rules/no-array-prototype-includes';
import { RuleTester } from '../../tester';

const ruleId = 'no-array-prototype-includes';
const error = (className?: string): TSESLint.TestCaseError<'forbidden'> => ({
  messageId: 'forbidden',
  line: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: `${className ?? ''}Array.prototype.includes` },
});

new RuleTester().run(ruleId, rule, {
  valid: [
    'includes(0)',
    'foo.reverse()',
    'foo.includes(0)',
    { code: 'includes(0)', settings: { es: { aggressive: true } } },
    { code: "'foo'.includes(0)", settings: { es: { aggressive: true } } },
    { code: '`foo`.includes(0)', settings: { es: { aggressive: true } } },
    { code: 'foo.reverse()', settings: { es: { aggressive: true } } },
    { code: 'foo.includes(0)', options: [{ aggressive: false }], settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { code: 'foo.includes(0)', errors: [{ ...error(), column: 1 }], settings: { es: { aggressive: true } } },
    {
      code: 'foo.includes(0)',
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
    { filename, code: 'includes(0)' },
    { filename, code: 'foo.reverse()' },
    { filename, code: 'foo.includes(0)' },
    { filename, code: 'let foo = {}; foo.includes(0)' },
    { filename, code: 'includes(0)', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.reverse()', settings: { es: { aggressive: true } } },
    { code: "'foo'.includes(0)", settings: { es: { aggressive: true } } },
    { code: '`foo`.includes(0)', settings: { es: { aggressive: true } } },

    // `Array` is unknown type if tsconfig.json is not configured.
    { filename, code: 'let foo = []; foo.includes(0)' },
    { filename, code: 'let foo = Array(); foo.includes(0)' },
    { filename, code: 'function f<T extends any[]>(a: T) { a.includes(0) }' },
    { filename, code: 'function f<T extends string[] | number[]>(a: T) { a.includes(0) }' },
  ],
  invalid: [
    { filename, code: '[a, b, c].includes(0)', errors: [{ ...error(), column: 1 }] },
    {
      filename,
      code: 'let foo = []; foo.includes(0)',
      errors: [{ ...error(), column: 15 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'let foo = Array(); foo.includes(0)',
      errors: [{ ...error(), column: 20 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'function f<T extends any[]>(a: T) { a.includes(0) }',
      errors: [{ ...error(), column: 37 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'function f<T extends string[] | number[]>(a: T) { a.includes(0) }',
      errors: [{ ...error(), column: 51 }],
      settings: { es: { aggressive: true } },
    },
    { filename, code: 'foo.includes(0)', errors: [{ ...error(), column: 1 }], settings: { es: { aggressive: true } } },
  ],
});

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(`${ruleId} TS Full Type Information`, rule, {
  valid: [
    { filename, code: 'includes(0)' },
    { filename, code: 'foo.reverse()' },
    { filename, code: 'foo.includes(0)' },
    { filename, code: 'let foo = {}; foo.includes(0)' },
    { filename, code: 'includes(0)', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.reverse()', settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { filename, code: '[a, b, c].includes(0)', errors: [{ ...error(), column: 1 }] },
    { filename, code: 'let foo = []; foo.includes(0)', errors: [{ ...error(), column: 15 }] },
    { filename, code: 'let foo = Array(); foo.includes(0)', errors: [{ ...error(), column: 20 }] },
    { filename, code: 'function f<T extends any[]>(a: T) { a.includes(0) }', errors: [{ ...error(), column: 37 }] },
    {
      filename,
      code: 'function f<T extends readonly any[]>(a: T) { a.includes(0) }',
      errors: [{ ...error(), column: 46 }],
    },
    {
      filename,
      code: 'function f<T extends string[] | number[]>(a: T) { a.includes(0) }',
      errors: [{ ...error(), column: 51 }],
    },
    ...[
      'Int8',
      'Uint8',
      'Uint8Clamped',
      'Int16',
      'Uint16',
      'Int32',
      'Uint32',
      'Float32',
      'Float64',
      'BigInt64',
      'BigUint64',
    ].map((className) => ({
      filename,
      code: `let foo = new ${className}Array(10); foo.includes(0)`,
      errors: [{ ...error(className), column: className.length + 26 }],
    })),
    { filename, code: 'foo.includes(0)', errors: [{ ...error(), column: 1 }], settings: { es: { aggressive: true } } },
  ],
});
