import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-map';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.Identifier, data: { name: 'Map' } };

new RuleTester().run('no-map', rule, {
  valid: ['Array', 'Object', 'let Map = 0; Map'],
  invalid: [
    {
      code: 'Map',
      errors: [{ ...error, column: 1 }],
    },
    {
      code: 'function f() { Map }',
      errors: [{ ...error, column: 16 }],
    },
  ],
});
