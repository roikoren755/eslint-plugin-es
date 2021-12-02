import path from 'path';

import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-string-prototype-trim';
import { RuleTester } from '../../tester';

const ruleId = 'no-string-prototype-trim';
const error = {
  messageId: 'forbidden' as const,
  line: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'String.prototype.trim' },
};

new RuleTester().run(ruleId, rule, {
  valid: [
    'trim()',
    'foo.charAt(0)',
    'foo.trim()',
    { code: 'trim()', settings: { es: { aggressive: true } } },
    { code: 'foo.charAt(0)', settings: { es: { aggressive: true } } },
    { code: 'foo.trim()', options: [{ aggressive: false }], settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { code: "'foo'.trim()", errors: [{ ...error, column: 1 }] },
    { code: 'foo.trim()', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
    {
      code: 'foo.trim()',
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
    { filename, code: 'trim()' },
    { filename, code: 'foo.charAt(0)' },
    { filename, code: 'foo.trim()' },
    { filename, code: 'let foo = {}; foo.trim()' },
    { filename, code: 'trim()', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.charAt(0)', settings: { es: { aggressive: true } } },

    // `String` is unknown type if tsconfig.json is not configured.
    { filename, code: 'let foo = String(); foo.trim()' },
  ],
  invalid: [
    { filename, code: "'foo'.trim()", errors: [{ ...error, column: 1 }] },
    { filename, code: "let foo = 'foo'; foo.trim()", errors: [{ ...error, column: 18 }] },
    { filename, code: 'function f<T extends string>(a: T) { a.trim() }', errors: [{ ...error, column: 38 }] },
    { filename, code: "function f<T extends 'a' | 'b'>(a: T) { a.trim() }", errors: [{ ...error, column: 41 }] },
    {
      filename,
      code: 'let foo = String(); foo.trim()',
      errors: [{ ...error, column: 21 }],
      settings: { es: { aggressive: true } },
    },
    { filename, code: 'foo.trim()', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
  ],
});

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(`${ruleId} TS Full Type Information`, rule, {
  valid: [
    { filename, code: 'trim()' },
    { filename, code: 'foo.charAt(0)' },
    { filename, code: 'foo.trim()' },
    { filename, code: 'let foo = {}; foo.trim()' },
    { filename, code: 'trim()', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.charAt(0)', settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { filename, code: "'foo'.trim()", errors: [{ ...error, column: 1 }] },
    { filename, code: "let foo = 'foo'; foo.trim()", errors: [{ ...error, column: 18 }] },
    { filename, code: 'let foo = String(); foo.trim()', errors: [{ ...error, column: 21 }] },
    { filename, code: 'function f<T extends string>(a: T) { a.trim() }', errors: [{ ...error, column: 38 }] },
    { filename, code: "function f<T extends 'a' | 'b'>(a: T) { a.trim() }", errors: [{ ...error, column: 41 }] },
    { filename, code: 'foo.trim()', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
  ],
});
