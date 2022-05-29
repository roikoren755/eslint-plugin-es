import { AST_TOKEN_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-optional-chaining';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_TOKEN_TYPES.Punctuator, data: {} };

new RuleTester().run('no-optional-chaining', rule, {
  valid: ['var x = a.b', 'var x = a[b]', 'foo()'],
  invalid: [
    { code: 'var x = a?.b', errors: [{ ...error, column: 10, endColumn: 12 }] },
    { code: 'var x = a?.[b]', errors: [{ ...error, column: 10, endColumn: 12 }] },
    { code: 'foo?.()', errors: [{ ...error, column: 4, endColumn: 6 }] },
    {
      code: 'var x = ((a?.b)?.c)?.()',
      errors: [
        { ...error, column: 12, endColumn: 14 },
        { ...error, column: 16, endColumn: 18 },
        { ...error, column: 20, endColumn: 22 },
      ],
    },
    { code: 'var x = a/*?.*/?.b', errors: [{ ...error, column: 16, endColumn: 18 }] },
    { code: "var x = '?.'?.['?.']", errors: [{ ...error, column: 13, endColumn: 15 }] },
  ],
});
