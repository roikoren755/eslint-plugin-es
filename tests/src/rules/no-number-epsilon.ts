import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-number-epsilon';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Number.EPSILON' },
};

new RuleTester().run('no-number-epsilon', rule, {
  valid: ['Number', 'Number.xyz', 'let Number = 0; Number.EPSILON'],
  invalid: [{ code: 'Number.EPSILON', errors: [error] }],
});
