import path from 'path';

import type { TSESLint } from '@typescript-eslint/experimental-utils';
import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-string-prototype-trimstart-trimend';
import { RuleTester } from '../../tester';

const ruleId = 'no-string-prototype-trimstart-trimend';
const error = (loc?: 'End'): TSESLint.TestCaseError<'forbidden'> => ({
  messageId: 'forbidden',
  line: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: `String.prototype.trim${loc ?? 'Start'}` },
});

new RuleTester().run(ruleId, rule, {
  valid: [
    'trimStart(2)',
    'trimEnd(2)',
    'foo.charAt(0)',
    'foo.trimStart(2)',
    'foo.trimEnd(2)',
    { code: 'trimStart(2)', settings: { es: { aggressive: true } } },
    { code: 'trimEnd(2)', settings: { es: { aggressive: true } } },
    { code: 'foo.charAt(0)', settings: { es: { aggressive: true } } },
    { code: 'foo.trimStart(2)', options: [{ aggressive: false }], settings: { es: { aggressive: true } } },
    "'foo'.trimLeft(2)",
    "'foo'.trimRight(2)",
    { code: 'foo.trimLeft(2)', settings: { es: { aggressive: true } } },
    { code: 'foo.trimRight(2)', settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { code: "'foo'.trimStart(2)", errors: [{ ...error(), column: 1 }] },
    { code: "'foo'.trimEnd(2)", errors: [{ ...error('End'), column: 1 }] },
    { code: 'foo.trimStart(2)', errors: [{ ...error(), column: 1 }], settings: { es: { aggressive: true } } },
    { code: 'foo.trimEnd(2)', errors: [{ ...error('End'), column: 1 }], settings: { es: { aggressive: true } } },
    {
      code: 'foo.trimStart(2)',
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
    { filename, code: 'trimStart(2)' },
    { filename, code: 'foo.charAt(0)' },
    { filename, code: 'foo.trimStart(2)' },
    { filename, code: 'let foo = {}; foo.trimStart(2)' },
    { filename, code: 'trimStart(2)', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.charAt(0)', settings: { es: { aggressive: true } } },
    { filename, code: "'foo'.trimLeft(2)" },
    { filename, code: "'foo'.trimRight(2)" },
    { filename, code: 'foo.trimLeft(2)', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.trimRight(2)', settings: { es: { aggressive: true } } },

    // `String` is unknown type if tsconfig.json is not configured.
    { filename, code: 'let foo = String(); foo.trimStart(2)' },
  ],
  invalid: [
    { filename, code: "'foo'.trimStart(2)", errors: [{ ...error(), column: 1 }] },
    { filename, code: "'foo'.trimEnd(2)", errors: [{ ...error('End'), column: 1 }] },
    { filename, code: "let foo = 'foo'; foo.trimStart(2)", errors: [{ ...error(), column: 18 }] },
    { filename, code: 'function f<T extends string>(a: T) { a.trimStart(2) }', errors: [{ ...error(), column: 38 }] },
    { filename, code: "function f<T extends 'a' | 'b'>(a: T) { a.trimStart(2) }", errors: [{ ...error(), column: 41 }] },
    {
      filename,
      code: 'let foo = String(); foo.trimStart(2)',
      errors: [{ ...error(), column: 21 }],
      settings: { es: { aggressive: true } },
    },
    { filename, code: 'foo.trimStart(2)', errors: [{ ...error(), column: 1 }], settings: { es: { aggressive: true } } },
  ],
});

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(`${ruleId} TS Full Type Information`, rule, {
  valid: [
    { filename, code: 'trimStart(2)' },
    { filename, code: 'foo.charAt(0)' },
    { filename, code: 'foo.trimStart(2)' },
    { filename, code: 'let foo = {}; foo.trimStart(2)' },
    { filename, code: 'trimStart(2)', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.charAt(0)', settings: { es: { aggressive: true } } },
    { filename, code: "'foo'.trimLeft(2)" },
    { filename, code: "'foo'.trimRight(2)" },
    { filename, code: 'foo.trimLeft(2)', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.trimRight(2)', settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { filename, code: "'foo'.trimStart(2)", errors: [{ ...error(), column: 1 }] },
    { filename, code: "'foo'.trimEnd(2)", errors: [{ ...error('End'), column: 1 }] },
    { filename, code: "let foo = 'foo'; foo.trimStart(2)", errors: [{ ...error(), column: 18 }] },
    { filename, code: 'let foo = String(); foo.trimStart(2)', errors: [{ ...error(), column: 21 }] },
    { filename, code: 'function f<T extends string>(a: T) { a.trimStart(2) }', errors: [{ ...error(), column: 38 }] },
    { filename, code: "function f<T extends 'a' | 'b'>(a: T) { a.trimStart(2) }", errors: [{ ...error(), column: 41 }] },
    { filename, code: 'foo.trimStart(2)', errors: [{ ...error(), column: 1 }], settings: { es: { aggressive: true } } },
  ],
});
