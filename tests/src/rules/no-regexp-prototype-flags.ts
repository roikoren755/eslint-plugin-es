import path from 'path';

import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-regexp-prototype-flags';
import { RuleTester } from '../../tester';

const ruleId = 'no-regexp-prototype-flags';
const error = {
  messageId: 'forbidden' as const,
  line: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'RegExp.prototype.flags' },
};

new RuleTester().run(ruleId, rule, {
  valid: [
    'foo.global',
    'foo.flags',
    { code: 'foo.global', settings: { es: { aggressive: true } } },
    { code: 'foo.flags', options: [{ aggressive: false }], settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { code: 'foo.flags', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
    {
      code: 'foo.flags',
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
    { filename, code: 'foo.global' },
    { filename, code: 'foo.flags' },
    { filename, code: 'let foo = {}; foo.flags' },
    { filename, code: 'foo.global', settings: { es: { aggressive: true } } },

    // `RegExp` is unknown type if tsconfig.json is not configured.
    { filename, code: "new RegExp('').flags" },
    { filename, code: "let foo = new RegExp(''); foo.flags" },
  ],
  invalid: [
    { filename, code: '/foo/.flags', errors: [{ ...error, column: 1 }] },
    {
      filename,
      code: "new RegExp('').flags",
      errors: [{ ...error, column: 1 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: "let foo = new RegExp(''); foo.flags",
      errors: [{ ...error, column: 27 }],
      settings: { es: { aggressive: true } },
    },
    { filename, code: 'foo.flags', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
  ],
});

new RuleTester({
  parser,
  parserOptions: { tsconfigRootDir, project },
}).run(`${ruleId} TS Full Type Information`, rule, {
  valid: [
    { filename, code: 'foo.global' },
    { filename, code: 'foo.flags' },
    { filename, code: 'let foo = {}; foo.flags' },
    { filename, code: 'foo.global', settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { filename, code: '/foo/.flags', errors: [{ ...error, column: 1 }] },
    { filename, code: "new RegExp('').flags", errors: [{ ...error, column: 1 }] },
    { filename, code: "let foo = new RegExp(''); foo.flags", errors: [{ ...error, column: 27 }] },
    { filename, code: 'foo.flags', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
  ],
});
