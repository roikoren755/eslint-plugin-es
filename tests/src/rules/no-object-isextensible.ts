import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-object-isextensible';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Object.isExtensible' },
};

new RuleTester().run('no-object-isextensible', rule, {
  valid: ['Object', 'Object.foo', 'let Object = 0; Object.isExtensible'],
  invalid: [{ code: 'Object.isExtensible', errors: [error] }],
});
