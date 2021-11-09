import type { TSESLint } from '@typescript-eslint/experimental-utils';
import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-json-superset';

const error = (code: number): TSESLint.TestCaseError<'forbidden'> => ({
  messageId: 'forbidden',
  line: 1,
  type: AST_NODE_TYPES.Literal,
  data: { code },
});

if (!RuleTester.isSupported(2019)) {
  console.log('Skip the tests of no-json-superset.');
} else {
  new RuleTester().run('no-json-superset', rule, {
    valid: ['let a = null', "let a = '\\u2028'", "let a = '\\u2029'", "let a = '\\\u2028'", "let a = '\\\u2029'"],
    invalid: [
      { code: "let a = '\u2028'", output: "let a = '\\u2028'", errors: [{ ...error(2028), column: 10 }] },
      { code: "let a = '\u2029'", output: "let a = '\\u2029'", errors: [{ ...error(2029), column: 10 }] },
      {
        code: "let a = '\u2028 and \u2029'",
        output: "let a = '\\u2028 and \\u2029'",
        errors: [
          { ...error(2028), column: 10 },
          { ...error(2029), line: 2, column: 6 },
        ],
      },
    ],
  });
}
