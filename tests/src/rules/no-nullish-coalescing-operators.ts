import { AST_TOKEN_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-nullish-coalescing-operators';

const type = AST_TOKEN_TYPES.Punctuator;

if (!RuleTester.isSupported(2020)) {
  console.log('Skip the tests of no-nullish-coalescing-operators.');
} else {
  new RuleTester().run('no-nullish-coalescing-operators', rule, {
    valid: ['a ? b : c', 'a && b', 'a || b'],
    invalid: [
      { code: 'a??b', errors: [{ messageId: 'forbidden', type, line: 1, column: 2, endColumn: 4 }] },
      {
        code: ` /* ?? comment ?? */
            a /* ?? comment ?? */
            ?? /* ?? comment ?? */
            b /* ?? comment ?? */`,
        errors: [{ messageId: 'forbidden', type, line: 3, column: 13, endLine: 3, endColumn: 15 }],
      },
      {
        code: 'a ?? b ?? c',
        errors: [
          { messageId: 'forbidden', type, line: 1, column: 3, endColumn: 5 },
          { messageId: 'forbidden', type, line: 1, column: 8, endColumn: 10 },
        ],
      },
      {
        code: '(a ?? b) ?? c',
        errors: [
          { messageId: 'forbidden', type, line: 1, column: 4, endColumn: 6 },
          { messageId: 'forbidden', type, line: 1, column: 10, endColumn: 12 },
        ],
      },
    ],
  });
}
