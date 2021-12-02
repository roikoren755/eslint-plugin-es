import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-object-getownpropertydescriptor';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Object.getOwnPropertyDescriptor' },
};

new RuleTester().run('no-object-getownpropertydescriptor', rule, {
  valid: ['Object', 'Object.foo', 'let Object = 0; Object.getOwnPropertyDescriptor'],
  invalid: [{ code: 'Object.getOwnPropertyDescriptor', errors: [error] }],
});
