import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-octal-numeric-literals';

const error = { messageId: 'forbidden' as const, line: 1, column: 1, type: AST_NODE_TYPES.Literal, data: {} };

new RuleTester().run('no-octal-numeric-literals', rule, {
  valid: ['123', '0123', '0x123', '0X123', '0b10', '0B10', '/*0o123*/x'],
  invalid: [
    { code: '0o123', errors: [error] },
    { code: '0O123', errors: [error] },
  ],
});
