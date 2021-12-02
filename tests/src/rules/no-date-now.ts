import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-date-now';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Date.now' },
};

new RuleTester().run('no-date-now', rule, {
  valid: ['Date', 'Date.parse', 'let Date = 0; Date.now'],
  invalid: [{ code: 'Date.now', errors: [error] }],
});
