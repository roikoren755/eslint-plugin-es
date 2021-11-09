import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-proxy';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.Identifier, data: { name: 'Proxy' } };

new RuleTester().run('no-proxy', rule, {
  valid: ['Array', 'Object', 'let Proxy = 0; Proxy'],
  invalid: [
    {
      code: 'Proxy',
      errors: [{ ...error, column: 1 }],
    },
    {
      code: 'function f() { Proxy }',
      errors: [{ ...error, column: 16 }],
    },
  ],
});
