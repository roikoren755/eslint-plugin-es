import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-array-isarray';

new RuleTester().run('no-array-isarray', rule, {
  valid: ['Array', 'Array.from', 'let Array = 0; Array.isArray'],
  invalid: [
    {
      code: 'Array.isArray',
      errors: [
        {
          messageId: 'forbidden',
          column: 1,
          line: 1,
          type: AST_NODE_TYPES.MemberExpression,
          data: { name: 'Array.isArray' },
        },
      ],
    },
  ],
});
