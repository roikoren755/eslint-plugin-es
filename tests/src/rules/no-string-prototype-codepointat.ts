import path from 'path';

import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-string-prototype-codepointat';
import { RuleTester } from '../../tester';

const ruleId = 'no-string-prototype-codepointat';
const error = {
  messageId: 'forbidden' as const,
  line: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'String.prototype.codePointAt' },
};

new RuleTester().run(ruleId, rule, {
  valid: [
    'codePointAt(0)',
    'foo.charAt(0)',
    'foo.codePointAt(0)',
    { code: 'codePointAt(0)', settings: { es: { aggressive: true } } },
    { code: 'foo.charAt(0)', settings: { es: { aggressive: true } } },
    { code: 'foo.codePointAt(0)', options: [{ aggressive: false }], settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { code: 'foo.codePointAt(0)', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
    {
      code: 'foo.codePointAt(0)',
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
    'codePointAt(0)',
    'foo.charAt(0)',
    'foo.codePointAt(0)',
    'let foo = {}; foo.codePointAt(0)',
    { code: 'codePointAt(0)', settings: { es: { aggressive: true } } },
    { code: 'foo.charAt(0)', settings: { es: { aggressive: true } } },

    // `String` is unknown type if tsconfig.json is not configured.
    'let foo = String(); foo.codePointAt(0)',
  ],
  invalid: [
    { code: "let foo = ''; foo.codePointAt(0)", errors: [{ ...error, column: 15 }] },
    { code: 'function f<T extends string>(a: T) { a.codePointAt(0) }', errors: [{ ...error, column: 38 }] },
    { code: "function f<T extends 'a' | 'b'>(a: T) { a.codePointAt(0) }", errors: [{ ...error, column: 41 }] },
    {
      code: 'let foo = String(); foo.codePointAt(0)',
      errors: [{ ...error, column: 21 }],
      settings: { es: { aggressive: true } },
    },
    { code: 'foo.codePointAt(0)', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
  ],
});

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(`${ruleId} TS Full Types`, rule, {
  valid: [
    { filename, code: 'codePointAt(0)' },
    { filename, code: 'foo.charAt(0)' },
    { filename, code: 'foo.codePointAt(0)' },
    { filename, code: 'let foo = {}; foo.codePointAt(0)' },
    { filename, code: 'codePointAt(0)', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.charAt(0)', settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { filename, code: "let foo = ''; foo.codePointAt(0)", errors: [{ ...error, column: 15 }] },
    { filename, code: 'let foo = String(); foo.codePointAt(0)', errors: [{ ...error, column: 21 }] },
    { filename, code: 'function f<T extends string>(a: T) { a.codePointAt(0) }', errors: [{ ...error, column: 38 }] },
    { filename, code: "function f<T extends 'a' | 'b'>(a: T) { a.codePointAt(0) }", errors: [{ ...error, column: 41 }] },
    { filename, code: 'foo.codePointAt(0)', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
  ],
});
