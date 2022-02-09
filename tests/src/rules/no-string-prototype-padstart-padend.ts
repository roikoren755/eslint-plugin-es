import path from 'path';

import { AST_NODE_TYPES } from '@typescript-eslint/types';
import type { TSESLint } from '@typescript-eslint/utils';

import rule from '../../../src/rules/no-string-prototype-padstart-padend';
import { RuleTester } from '../../tester';

const ruleId = 'no-string-prototype-padstart-padend';
const error = (loc?: 'End'): TSESLint.TestCaseError<'forbidden'> => ({
  messageId: 'forbidden',
  line: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: `String.prototype.pad${loc ?? 'Start'}` },
});

new RuleTester().run(ruleId, rule, {
  valid: [
    'padStart(2)',
    'padEnd(2)',
    'foo.charAt(0)',
    'foo.padStart(2)',
    'foo.padEnd(2)',
    { code: 'padStart(2)', settings: { es: { aggressive: true } } },
    { code: 'padEnd(2)', settings: { es: { aggressive: true } } },
    { code: 'foo.charAt(0)', settings: { es: { aggressive: true } } },
    { code: 'foo.padStart(2)', options: [{ aggressive: false }], settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { code: "'foo'.padStart(2)", errors: [{ ...error(), column: 1 }] },
    { code: "'foo'.padEnd(2)", errors: [{ ...error('End'), column: 1 }] },
    { code: 'foo.padStart(2)', errors: [{ ...error(), column: 1 }], settings: { es: { aggressive: true } } },
    { code: 'foo.padEnd(2)', errors: [{ ...error('End'), column: 1 }], settings: { es: { aggressive: true } } },
    {
      code: 'foo.padStart(2)',
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
    { filename, code: 'padStart(2)' },
    { filename, code: 'foo.charAt(0)' },
    { filename, code: 'foo.padStart(2)' },
    { filename, code: 'let foo = {}; foo.padStart(2)' },
    { filename, code: 'padStart(2)', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.charAt(0)', settings: { es: { aggressive: true } } },

    // `String` is unknown type if tsconfig.json is not configured.
    { filename, code: 'let foo = String(); foo.padStart(2)' },
  ],
  invalid: [
    { filename, code: "'foo'.padStart(2)", errors: [{ ...error(), column: 1 }] },
    { filename, code: "'foo'.padEnd(2)", errors: [{ ...error('End'), column: 1 }] },
    { filename, code: "let foo = 'foo'; foo.padStart(2)", errors: [{ ...error(), column: 18 }] },
    { filename, code: 'function f<T extends string>(a: T) { a.padStart(2) }', errors: [{ ...error(), column: 38 }] },
    { filename, code: "function f<T extends 'a' | 'b'>(a: T) { a.padStart(2) }", errors: [{ ...error(), column: 41 }] },
    {
      filename,
      code: 'let foo = String(); foo.padStart(2)',
      errors: [{ ...error(), column: 21 }],
      settings: { es: { aggressive: true } },
    },
    { filename, code: 'foo.padStart(2)', errors: [{ ...error(), column: 1 }], settings: { es: { aggressive: true } } },
  ],
});

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(`${ruleId} TS Full Type Information`, rule, {
  valid: [
    { filename, code: 'padStart(2)' },
    { filename, code: 'foo.charAt(0)' },
    { filename, code: 'foo.padStart(2)' },
    { filename, code: 'let foo = {}; foo.padStart(2)' },
    { filename, code: 'padStart(2)', settings: { es: { aggressive: true } } },
    { filename, code: 'foo.charAt(0)', settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { filename, code: "'foo'.padStart(2)", errors: [{ ...error(), column: 1 }] },
    { filename, code: "'foo'.padEnd(2)", errors: [{ ...error('End'), column: 1 }] },
    { filename, code: "let foo = 'foo'; foo.padStart(2)", errors: [{ ...error(), column: 18 }] },
    { filename, code: 'let foo = String(); foo.padStart(2)', errors: [{ ...error(), column: 21 }] },
    { filename, code: 'function f<T extends string>(a: T) { a.padStart(2) }', errors: [{ ...error(), column: 38 }] },
    { filename, code: "function f<T extends 'a' | 'b'>(a: T) { a.padStart(2) }", errors: [{ ...error(), column: 41 }] },
    { filename, code: 'foo.padStart(2)', errors: [{ ...error(), column: 1 }], settings: { es: { aggressive: true } } },
  ],
});
