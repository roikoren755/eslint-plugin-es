import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-number-parseint';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Number.parseInt' },
};

new RuleTester().run('no-number-parseint', rule, {
  valid: ['Number', 'Number.xyz', 'let Number = 0; Number.parseInt'],
  invalid: [{ code: 'Number.parseInt', errors: [error] }],
});
