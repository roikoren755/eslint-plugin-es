import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-class-static-block';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.StaticBlock, data: {} };

if (!RuleTester.isSupported(2022)) {
  console.log('Skip the tests of no-class-static-block.');
} else {
  new RuleTester().run('no-class-static-block', rule, {
    valid: ['class A { static f() {} }', 'class A { static get f() {} }'],
    invalid: [
      { code: 'class A { static {}; }', errors: [{ ...error, column: 11 }] },
      { code: '(class { static {} })', errors: [{ ...error, column: 10 }] },
    ],
  });
}
