import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-regexp-d-flag';
import { AST_NODE_TYPES } from '@typescript-eslint/types';

const error = { messageId: 'forbidden' as const, line: 1, column: 1, type: AST_NODE_TYPES.NewExpression, data: {} };

if (!RuleTester.isSupported(2022)) {
  console.log('Skip the tests of no-regexp-d-flag.');
} else {
  new RuleTester().run('no-regexp-d-flag', rule, {
    valid: [
      '/foo/gimuys',
      'a\n/b/d',
      "new RegExp('foo', 'gimuys')",
      "new RegExp('foo')",
      "new RegExp('foo', flags)",
      "const flags = 'gimuys'; new RegExp('foo', flags)",
    ],
    invalid: [
      { code: '/foo/d', errors: [{ ...error, type: AST_NODE_TYPES.Literal }] },
      { code: '/foo/gimsuyd', errors: [{ ...error, type: AST_NODE_TYPES.Literal }] },
      { code: "new RegExp('foo', 'd')", errors: [error] },
      { code: "new RegExp('foo', 'gimsuyd')", errors: [error] },
      { code: "const flags = 'd'; new RegExp('foo', flags)", errors: [{ ...error, column: 20 }] },
    ],
  });
}
