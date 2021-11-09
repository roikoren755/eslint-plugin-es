import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-regexp-unicode-property-escapes';

const baseError = { messageId: 'forbidden' as const, line: 1, column: 1, data: {} };
const literalError = { ...baseError, type: AST_NODE_TYPES.Literal };
const newError = { ...baseError, type: AST_NODE_TYPES.NewExpression };

new RuleTester().run('no-regexp-unicode-property-escapes', rule, {
  valid: [
    String.raw`/p{Letter}/`,
    String.raw`/P{Letter}/`,
    String.raw`/\p{Letter}/`,
    String.raw`/\P{Letter}/`,
    String.raw`/\\p{Letter}/`,
    String.raw`/\\P{Letter}/`,
    String.raw`new RegExp('p{Letter}')`,
    String.raw`new RegExp('P{Letter}')`,
    String.raw`new RegExp('\\p{Letter}')`,
    String.raw`new RegExp('\\P{Letter}')`,
    String.raw`new RegExp('\\\\p{Letter}')`,
    String.raw`new RegExp('\\\\P{Letter}')`,

    // Ignore syntax errors.
    String.raw`new RegExp('\\p{Letter', 'u')`,
  ],
  invalid: [
    { code: String.raw`/\p{Letter}/u`, errors: [literalError] },
    { code: String.raw`/\P{Letter}/u`, errors: [literalError] },
    { code: String.raw`/\\\p{Letter}/u`, errors: [literalError] },
    { code: String.raw`/\\\P{Letter}/u`, errors: [literalError] },
    { code: String.raw`/\p{Script=Hiragana}/u`, errors: [literalError] },
    { code: String.raw`new RegExp('\\p{Letter}', 'u')`, errors: [newError] },
    { code: String.raw`new RegExp('\\P{Letter}', 'u')`, errors: [newError] },
    { code: String.raw`new RegExp('\\\\\\p{Letter}', 'u')`, errors: [newError] },
    { code: String.raw`new RegExp('\\\\\\P{Letter}', 'u')`, errors: [newError] },
    { code: String.raw`new RegExp('\\p{Script=Hiragana}', 'u')`, errors: [newError] },
    {
      code: String.raw`const pattern = '\\p{Script=Hiragana}', flags = 'u', regex = new RegExp(pattern, flags)`,
      errors: [{ ...newError, column: 62 }],
    },

    // It's valid even if in character classes.
    { code: String.raw`/[\p{Letter}]/u`, errors: [literalError] },
    { code: String.raw`/[\P{Letter}]/u`, errors: [literalError] },
  ],
});
