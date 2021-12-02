import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-number-parsefloat';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Number.parseFloat' },
};

new RuleTester().run('no-number-parsefloat', rule, {
  valid: ['Number', 'Number.xyz', 'let Number = 0; Number.parseFloat'],
  invalid: [{ code: 'Number.parseFloat', errors: [error] }],
});
