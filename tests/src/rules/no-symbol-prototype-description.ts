import path from 'path';

import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-symbol-prototype-description';
import { RuleTester } from '../../tester';

const ruleId = 'no-symbol-prototype-description';
const error = {
  messageId: 'forbidden' as const,
  line: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Symbol.prototype.description' },
};

new RuleTester().run(ruleId, rule, {
  valid: [
    'foo.description',
    'Symbol.iterator.description',
    'Symbol().description',
    { code: 'foo.description', options: [{ aggressive: false }], settings: { es: { aggressive: true } } },
  ],
  invalid: [
    { code: 'foo.description', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
    {
      code: 'foo.description',
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
    { filename, code: 'foo.description' },

    // `Symbol` is unknown type if tsconfig.json is not configured.
    { filename, code: 'Symbol.iterator.description' },
    { filename, code: 'Symbol().description' },
  ],
  invalid: [
    { filename, code: 'foo.description', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
  ],
});

new RuleTester({
  parser,
  parserOptions: { tsconfigRootDir, project },
}).run(`${ruleId} TS Full Type Information`, rule, {
  valid: [{ filename, code: 'foo.description' }],
  invalid: [
    { filename, code: 'Symbol.iterator.description', errors: [{ ...error, column: 1 }] },
    { filename, code: 'Symbol().description', errors: [{ ...error, column: 1 }] },
    { filename, code: 'let foo = Symbol(); foo.description', errors: [{ ...error, column: 21 }] },
    { filename, code: 'foo.description', errors: [{ ...error, column: 1 }], settings: { es: { aggressive: true } } },
  ],
});
