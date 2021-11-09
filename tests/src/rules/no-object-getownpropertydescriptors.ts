import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-object-getownpropertydescriptors';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Object.getOwnPropertyDescriptors' },
};

new RuleTester().run('no-object-getownpropertydescriptors', rule, {
  valid: ['Object', 'Object.assign', 'let Object = 0; Object.getOwnPropertyDescriptors'],
  invalid: [{ code: 'Object.getOwnPropertyDescriptors', errors: [error] }],
});
