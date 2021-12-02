import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-object-seal';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Object.seal' },
};

new RuleTester().run('no-object-seal', rule, {
  valid: ['Object', 'Object.foo', 'let Object = 0; Object.seal'],
  invalid: [{ code: 'Object.seal', errors: [error] }],
});
