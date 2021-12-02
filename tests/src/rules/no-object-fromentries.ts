import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-object-fromentries';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Object.fromEntries' },
};

new RuleTester().run('no-object-fromentries', rule, {
  valid: ['Object', 'Object.assign', 'let Object = 0; Object.fromEntries'],
  invalid: [{ code: 'Object.fromEntries', errors: [error] }],
});
