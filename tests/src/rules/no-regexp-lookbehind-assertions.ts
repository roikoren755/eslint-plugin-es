import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-regexp-lookbehind-assertions';
import { RuleTester } from '../../tester';

const baseError = { messageId: 'forbidden' as const, line: 1, column: 1, data: {} };
const literalError = { ...baseError, type: AST_NODE_TYPES.Literal };
const newError = { ...baseError, type: AST_NODE_TYPES.NewExpression };

new RuleTester().run('no-regexp-lookbehind-assertions', rule, {
  valid: [
    String.raw`/(?=a)b/`,
    String.raw`/(?!a)b/`,
    String.raw`/(\?<=a)b/`,
    String.raw`/(\?<!a)b/`,
    String.raw`/\(?<=a\)b/`,
    String.raw`/\(?<!a\)b/`,
    String.raw`/\\\(?<=a\)b/`,
    String.raw`/\\\(?<!a\)b/`,
    String.raw`new RegExp("(?=a)b")`,
    String.raw`new RegExp("(?!a)b")`,
    String.raw`new RegExp("(\\?<=a)b")`,
    String.raw`new RegExp("(\\?<!a)b")`,
    String.raw`new RegExp("\\(?<=a\\)b")`,
    String.raw`new RegExp("\\(?<!a\\)b")`,

    // Allow those in character classes.
    String.raw`/[(?<=a)b]/`,
    String.raw`/[(?<!a)b]/`,

    // Ignore syntax errors.
    String.raw`new RegExp("(?<=a(", "u")`,
  ],
  invalid: [
    { code: String.raw`/(?<=a)b/`, errors: [literalError] },
    { code: String.raw`/(?<!a)b/`, errors: [literalError] },
    { code: String.raw`/\\(?<=a)b/`, errors: [literalError] },
    { code: String.raw`/\\(?<!a)b/`, errors: [literalError] },
    { code: String.raw`/\(?<=a\)(?<=a)b/`, errors: [literalError] },
    { code: String.raw`/\(?<!a\)\\(?<!a)b/`, errors: [literalError] },
    { code: String.raw`new RegExp("(?<=a)b")`, errors: [newError] },
    { code: String.raw`new RegExp("(?<!a)b")`, errors: [newError] },
    { code: String.raw`new RegExp("\\\\(?<=a)b")`, errors: [newError] },
    { code: String.raw`new RegExp("\\\\(?<!a)b")`, errors: [newError] },
  ],
});
