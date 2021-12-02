import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-number-isfinite';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Number.isFinite' },
};

new RuleTester().run('no-number-isfinite', rule, {
  valid: ['Number', 'Number.xyz', 'let Number = 0; Number.isFinite'],
  invalid: [{ code: 'Number.isFinite', errors: [error] }],
});
