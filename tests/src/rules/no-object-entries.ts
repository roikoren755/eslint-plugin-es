import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-object-entries';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Object.entries' },
};

new RuleTester().run('no-object-entries', rule, {
  valid: ['Object', 'Object.assign', 'let Object = 0; Object.entries'],
  invalid: [{ code: 'Object.entries', errors: [error] }],
});
