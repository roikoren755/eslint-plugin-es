import path from 'path';
import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-string-prototype-startswith';

const ruleId = 'no-string-prototype-startswith';
const error = {
  messageId: 'forbidden' as const,
  line: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'String.prototype.startsWith' },
};

new RuleTester().run(ruleId, rule, {
  valid: [
    "startsWith('a')",
    'foo.charAt(0)',
    "foo.startsWith('a')",
    { code: "startsWith('a')", settings: { es: { aggressive: true } } },
    { code: 'foo.charAt(0)', settings: { es: { aggressive: true } } },
    { code: "foo.startsWith('a')", options: [{ aggressive: false }], settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { code: "'foo'.startsWith('a')", errors: [{ ...error, column: 1 }] },
    { code: "foo.startsWith('a')", errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
    {
      code: "foo.startsWith('a')",
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
    { filename, code: "startsWith('a')" },
    { filename, code: 'foo.charAt(0)' },
    { filename, code: "foo.startsWith('a')" },
    { filename, code: "let foo = {}; foo.startsWith('a')" },
    { filename, code: "startsWith('a')", settings: { es: { aggressive: true } } },
    { filename, code: 'foo.charAt(0)', settings: { es: { aggressive: true } } },

    // `String` is unknown type if tsconfig.json is not configured.
    { filename, code: "let foo = String(); foo.startsWith('a')" },
  ],
  invalid: [
    { filename, code: "'foo'.startsWith('a')", errors: [{ ...error, column: 1 }] },
    { filename, code: "let foo = 'foo'; foo.startsWith('a')", errors: [{ ...error, column: 18 }] },
    { filename, code: "function f<T extends string>(a: T) { a.startsWith('a') }", errors: [{ ...error, column: 38 }] },
    {
      filename,
      code: "function f<T extends 'a' | 'b'>(a: T) { a.startsWith('a') }",
      errors: [{ ...error, column: 41 }],
    },
    {
      filename,
      code: "let foo = String(); foo.startsWith('a')",
      errors: [{ ...error, column: 21 }],
      settings: { es: { aggressive: true } },
    },
    { filename, code: "foo.startsWith('a')", errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
  ],
});

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(`${ruleId} TS Full Type Information`, rule, {
  valid: [
    { filename, code: "startsWith('a')" },
    { filename, code: 'foo.charAt(0)' },
    { filename, code: "foo.startsWith('a')" },
    { filename, code: "let foo = {}; foo.startsWith('a')" },
    { filename, code: "startsWith('a')", settings: { es: { aggressive: true } } },
    { filename, code: 'foo.charAt(0)', settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { filename, code: "'foo'.startsWith('a')", errors: [{ ...error, column: 1 }] },
    { filename, code: "let foo = 'foo'; foo.startsWith('a')", errors: [{ ...error, column: 18 }] },
    { filename, code: "let foo = String(); foo.startsWith('a')", errors: [{ ...error, column: 21 }] },
    { filename, code: "function f<T extends string>(a: T) { a.startsWith('a') }", errors: [{ ...error, column: 38 }] },
    {
      filename,
      code: "function f<T extends 'a' | 'b'>(a: T) { a.startsWith('a') }",
      errors: [{ ...error, column: 41 }],
    },
    { filename, code: "foo.startsWith('a')", errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
  ],
});
