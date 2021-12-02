import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-array-of';
import { RuleTester } from '../../tester';

new RuleTester().run('no-array-of', rule, {
  valid: ['Array', 'Array.from', 'let Array = 0; Array.of'],
  invalid: [
    {
      code: 'Array.of',
      errors: [
        {
          messageId: 'forbidden',
          column: 1,
          line: 1,
          type: AST_NODE_TYPES.MemberExpression,
          data: { name: 'Array.of' },
        },
      ],
    },
  ],
});
