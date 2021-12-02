import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-object-assign';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Object.assign' },
};

new RuleTester().run('no-object-assign', rule, {
  valid: ['Object', 'Object.is', 'let Object = 0; Object.assign'],
  invalid: [{ code: 'Object.assign', errors: [error] }],
});
