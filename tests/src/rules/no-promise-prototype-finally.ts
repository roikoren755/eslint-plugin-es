import path from 'path';
import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-promise-prototype-finally';

const ruleId = 'no-promise-prototype-finally';
const error = {
  messageId: 'forbidden' as const,
  line: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Promise.prototype.finally' },
};

new RuleTester().run(ruleId, rule, {
  valid: [
    'foo.then(() => {})',
    'foo.finally(() => {})',
    { code: 'foo.then(() => {})', settings: { es: { aggressive: true } } },
    { code: 'foo.finally(() => {})', options: [{ aggressive: false }], settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { code: 'foo.finally(() => {})', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
    {
      code: 'foo.finally(() => {})',
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
    { filename, code: 'foo.then(() => {})' },
    { filename, code: 'foo.finally(() => {})' },
    { filename, code: 'let foo = {}; foo.finally(() => {})' },
    { filename, code: 'foo.then(() => {})', settings: { es: { aggressive: true } } },

    // `Promise` is unknown type if tsconfig.json is not configured.
    { filename, code: 'async function f() {} f().finally(() => {})' },
    { filename, code: 'let foo = Promise.resolve(); foo.finally(() => {})' },
  ],
  invalid: [
    {
      filename,
      code: 'async function f() {} f().finally(() => {})',
      errors: [{ ...error, column: 23 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'let foo = Promise.resolve(); foo.finally(() => {})',
      errors: [{ ...error, column: 30 }],
      settings: { es: { aggressive: true } },
    },
    {
      filename,
      code: 'foo.finally(() => {})',
      errors: [{ ...error, column: 1 }],
      settings: { es: { aggressive: true } },
    },
  ],
});

new RuleTester({
  parser,
  parserOptions: { tsconfigRootDir, project },
}).run(`${ruleId} TS Full Type Information`, rule, {
  valid: [
    { filename, code: 'foo.then(() => {})' },
    { filename, code: 'foo.finally(() => {})' },
    { filename, code: 'let foo = {}; foo.finally(() => {})' },
    { filename, code: 'foo.then(() => {})', settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { filename, code: 'async function f() {} f().finally(() => {})', errors: [{ ...error, column: 23 }] },
    { filename, code: 'async function f() {} let foo = f(); foo.finally(() => {})', errors: [{ ...error, column: 38 }] },
    { filename, code: 'let foo = Promise.resolve(); foo.finally(() => {})', errors: [{ ...error, column: 30 }] },
    { filename, code: 'Promise.resolve().finally(() => {})', errors: [{ ...error, column: 1 }] },
    { filename, code: 'Promise.resolve().then(() => {}).finally(() => {})', errors: [{ ...error, column: 1 }] },
    {
      filename,
      code: 'foo.finally(() => {})',
      errors: [{ ...error, column: 1 }],
      settings: { es: { aggressive: true } },
    },
  ],
});
