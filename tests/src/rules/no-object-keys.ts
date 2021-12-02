import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-object-keys';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Object.keys' },
};

new RuleTester().run('no-object-keys', rule, {
  valid: ['Object', 'Object.assign', 'let Object = 0; Object.keys'],
  invalid: [{ code: 'Object.keys', errors: [error] }],
});
