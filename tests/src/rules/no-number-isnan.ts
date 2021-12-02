import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-number-isnan';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Number.isNaN' },
};

new RuleTester().run('no-number-isnan', rule, {
  valid: ['Number', 'Number.xyz', 'let Number = 0; Number.isNaN'],
  invalid: [{ code: 'Number.isNaN', errors: [error] }],
});
