import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-binary-numeric-literals';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, column: 1, type: AST_NODE_TYPES.Literal, data: {} };

new RuleTester().run('no-binary-numeric-literals', rule, {
  valid: ['1', '1e10', '01', '0x1', '0o1', '0O1', "'0b01'", "'0B01'"],
  invalid: [
    { code: '0b01', errors: [error] },
    { code: '0B01', errors: [error] },
  ],
});
