import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-object-hasown';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'Object.hasOwn' },
};

if (!RuleTester.isSupported(2022)) {
  console.log('Skip the tests of no-object-hasown.');
} else {
  new RuleTester().run('no-object-hasown', rule, {
    valid: ['Object', 'Object.assign', 'let Object = 0; Object.is'],
    invalid: [{ code: 'Object.hasOwn', errors: [error] }],
  });
}
