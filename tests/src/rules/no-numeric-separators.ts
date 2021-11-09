import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-numeric-separators';

const error = { messageId: 'forbidden' as const, line: 1, column: 1, type: AST_NODE_TYPES.Literal, data: {} };

if (!RuleTester.isSupported(2021)) {
  console.log('Skip the tests of no-numeric-separators.');
} else {
  new RuleTester().run('no-numeric-separators', rule, {
    valid: ['123456', '-123', '123.456', '123.0', 'NaN', '123e-1', '0x11', '0b11', '0o11', 'Infinity', '123456n'],
    invalid: [
      { code: '123_456', output: '123456', errors: [error] },
      { code: '5_000', output: '5000', errors: [error] },
      { code: '1_234_56', output: '123456', errors: [error] },
      { code: '5.00_00', output: '5.0000', errors: [error] },
      { code: '0b11_01', output: '0b1101', errors: [error] },
      { code: '5e1_000', output: '5e1000', errors: [error] },
      { code: '0xBE_EF', output: '0xBEEF', errors: [error] },
      { code: '123_456n', output: '123456n', errors: [error] },
    ],
  });
}
