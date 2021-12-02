import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-classes';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.ClassDeclaration, data: {} };

new RuleTester().run('no-classes', rule, {
  valid: ['function A() {} A.prototype.foo = function() {}'],
  invalid: [
    { code: 'class A {}', errors: [{ ...error, column: 1 }] },
    { code: '(class {})', errors: [{ ...error, column: 2, type: AST_NODE_TYPES.ClassExpression }] },
  ],
});
