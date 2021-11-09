import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-array-from';

new RuleTester().run('no-array-from', rule, {
  valid: ['Array', 'Array.of', 'let Array = 0; Array.from'],
  invalid: [
    {
      code: 'Array.from',
      errors: [
        {
          messageId: 'forbidden',
          column: 1,
          line: 1,
          type: AST_NODE_TYPES.MemberExpression,
          data: { name: 'Array.from' },
        },
      ],
    },
  ],
});
