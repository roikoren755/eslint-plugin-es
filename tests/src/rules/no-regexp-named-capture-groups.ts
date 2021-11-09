import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-regexp-named-capture-groups';

const baseError = { messageId: 'forbidden' as const, line: 1, column: 1, data: {} };
const literalError = { ...baseError, type: AST_NODE_TYPES.Literal };
const newError = { ...baseError, type: AST_NODE_TYPES.NewExpression };

new RuleTester().run('no-regexp-named-capture-groups', rule, {
  valid: [
    String.raw`/foo/`,
    String.raw`/\k<a>/`,
    String.raw`/\(?<a>a\)b/`,
    String.raw`/\\\(?<a>a\)b/`,
    String.raw`new RegExp('foo')`,
    String.raw`new RegExp('\\k<a>')`,
    String.raw`new RegExp('\\(?<a>a\\)b')`,
    String.raw`new RegExp('\\\\\\(?<a>a\\)b')`,

    // Capture groups but unnamed.
    '/(foo)\\1/',

    // Allow those in character classes.
    String.raw`/[(?<a>a)b]/`,
    String.raw`/[(?<a>a)b\k<a>]/`,

    // Ignore syntax errors.
    String.raw`new RegExp("(?<a", "u")`,
  ],
  invalid: [
    { code: String.raw`/(?<a>a)b/`, errors: [literalError] },
    { code: String.raw`/(?<a>a)b\k<a>/`, errors: [literalError] },
    { code: String.raw`/\\(?<a>a)b/`, errors: [literalError] },
    { code: String.raw`/\(?<a>a\)\\(?<a>a)b/`, errors: [literalError] },
    { code: String.raw`new RegExp("(?<a>a)b")`, errors: [newError] },
    { code: String.raw`new RegExp("(?<a>a)b\\k<a>")`, errors: [newError] },
    { code: String.raw`new RegExp("\\\\(?<a>a)b")`, errors: [newError] },
    { code: String.raw`new RegExp("\\(?<a>a\\)\\\\(?<a>a)b")`, errors: [newError] },
  ],
});
