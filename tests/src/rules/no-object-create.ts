import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-object-create';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Object.create' },
};

new RuleTester().run('no-object-create', rule, {
  valid: ['Object', 'Object.foo', 'let Object = 0; Object.create'],
  invalid: [{ code: 'Object.create', errors: [error] }],
});
