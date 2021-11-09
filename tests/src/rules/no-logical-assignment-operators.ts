import { AST_TOKEN_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-logical-assignment-operators';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_TOKEN_TYPES.Punctuator, data: {} };

if (!RuleTester.isSupported(2021)) {
  console.log('Skip the tests of no-logical-assignment-operators.');
} else {
  new RuleTester().run('no-logical-assignment-operators', rule, {
    valid: ['x = x || y', 'x = x && y', 'x = x ?? y', 'x += y', 'x -= y', 'x **= y'],
    invalid: [
      { code: 'x ||= y', output: 'x = x || (y)', errors: [{ ...error, column: 3 }] },
      { code: 'x &&= y', output: 'x = x && (y)', errors: [{ ...error, column: 3 }] },
      { code: 'x ??= y', output: 'x = x ?? (y)', errors: [{ ...error, column: 3 }] },
      { code: 'a.b ||= c', output: null, errors: [{ ...error, column: 5 }] },
      { code: 'a().b ||= c', output: null, errors: [{ ...error, column: 7 }] },
      { code: 'a &&= (c + d)', output: 'a = a && (c + d)', errors: [{ ...error, column: 3 }] },
    ],
  });
}
