import path from 'path';

import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-string-prototype-replaceall';
import { RuleTester } from '../../tester';

const ruleId = 'no-string-prototype-replaceall';
const error = {
  messageId: 'forbidden' as const,
  line: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'String.prototype.replaceAll' },
};

new RuleTester().run(ruleId, rule, {
  valid: [
    "replaceAll('a')",
    'foo.charAt(0)',
    "foo.replaceAll('a')",
    { code: "replaceAll('a')", settings: { es: { aggressive: true } } },
    { code: 'foo.charAt(0)', settings: { es: { aggressive: true } } },
    { code: "foo.replaceAll('a')", options: [{ aggressive: false }], settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { code: "'foo'.replaceAll('a')", errors: [{ ...error, column: 1 }] },
    { code: "foo.replaceAll('a')", errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
    {
      code: "foo.replaceAll('a')",
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
    { filename, code: "replaceAll('a')" },
    { filename, code: 'foo.charAt(0)' },
    { filename, code: "foo.replaceAll('a')" },
    { filename, code: "let foo = {}; foo.replaceAll('a')" },
    { filename, code: "replaceAll('a')", settings: { es: { aggressive: true } } },
    { filename, code: 'foo.charAt(0)', settings: { es: { aggressive: true } } },

    // `String` is unknown type if tsconfig.json is not configured.
    { filename, code: "let foo = String(); foo.replaceAll('a')" },
  ],
  invalid: [
    { filename, code: "'foo'.replaceAll('a')", errors: [{ ...error, column: 1 }] },
    { filename, code: "let foo = 'foo'; foo.replaceAll('a')", errors: [{ ...error, column: 18 }] },
    { filename, code: "function f<T extends string>(a: T) { a.replaceAll('a') }", errors: [{ ...error, column: 38 }] },
    {
      filename,
      code: "function f<T extends 'a' | 'b'>(a: T) { a.replaceAll('a') }",
      errors: [{ ...error, column: 41 }],
    },
    {
      filename,
      code: "let foo = String(); foo.replaceAll('a')",
      errors: [{ ...error, column: 21 }],
      settings: { es: { aggressive: true } },
    },
    { filename, code: "foo.replaceAll('a')", errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
  ],
});

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(`${ruleId} TS Full Type Information`, rule, {
  valid: [
    { filename, code: "replaceAll('a')" },
    { filename, code: 'foo.charAt(0)' },
    { filename, code: "foo.replaceAll('a')" },
    { filename, code: "let foo = {}; foo.replaceAll('a')" },
    { filename, code: "replaceAll('a')", settings: { es: { aggressive: true } } },
    { filename, code: 'foo.charAt(0)', settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { filename, code: "'foo'.replaceAll('a')", errors: [{ ...error, column: 1 }] },
    { filename, code: "let foo = 'foo'; foo.replaceAll('a')", errors: [{ ...error, column: 18 }] },
    { filename, code: "let foo = String(); foo.replaceAll('a')", errors: [{ ...error, column: 21 }] },
    { filename, code: "function f<T extends string>(a: T) { a.replaceAll('a') }", errors: [{ ...error, column: 38 }] },
    {
      filename,
      code: "function f<T extends 'a' | 'b'>(a: T) { a.replaceAll('a') }",
      errors: [{ ...error, column: 41 }],
    },
    { filename, code: "foo.replaceAll('a')", errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
  ],
});
