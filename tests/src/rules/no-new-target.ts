import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-new-target';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, column: 27, type: AST_NODE_TYPES.MetaProperty, data: {} };

new RuleTester().run('no-new-target', rule, {
  valid: ['new F()', 'target = 1'],
  invalid: [{ code: 'class A { constructor() { new.target } }', errors: [error] }],
});
