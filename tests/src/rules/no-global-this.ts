import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-global-this';

const error = { messageId: 'forbidden' as const, line: 1, column: 1, data: { name: 'globalThis' } };

if (!RuleTester.isSupported(2020)) {
  console.log('Skip the tests of no-global-this.');
} else {
  new RuleTester().run('no-global-this', rule, {
    valid: ['window', 'global', 'self', '{ let globalThis = 0; globalThis }'],
    invalid: [
      { code: 'globalThis', errors: [{ ...error, type: AST_NODE_TYPES.Identifier }] },
      {
        code: 'window.globalThis',
        globals: { window: 'readonly' },
        errors: [{ ...error, type: AST_NODE_TYPES.MemberExpression }],
      },
    ],
  });
}
