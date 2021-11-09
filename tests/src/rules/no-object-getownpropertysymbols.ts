import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-object-getownpropertysymbols';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Object.getOwnPropertySymbols' },
};

new RuleTester().run('no-object-getownpropertysymbols', rule, {
  valid: ['Object', 'Object.assign', 'let Object = 0; Object.getOwnPropertySymbols'],
  invalid: [{ code: 'Object.getOwnPropertySymbols', errors: [error] }],
});
