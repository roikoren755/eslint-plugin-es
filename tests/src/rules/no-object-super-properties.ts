import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-object-super-properties';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.Super, data: {} };

new RuleTester().run('no-object-super-properties', rule, {
  valid: [
    'class A { foo() { super.a } }',
    'class A { foo() { super.foo() } }',
    'class A extends B { constructor() { super() } }',
  ],
  invalid: [
    { code: '({ foo() { super.a } })', errors: [{ ...error, column: 12 }] },
    { code: '({ foo() { super.foo() } })', errors: [{ ...error, column: 12 }] },
    { code: '({ foo() { return () => super.a } })', errors: [{ ...error, column: 25 }] },
    {
      code: '({ foo() { ({ foo() { return () => super.a } }); class A { foo() { super.a } } return () => super.a } })',
      errors: [
        { ...error, column: 36 },
        { ...error, column: 93 },
      ],
    },
  ],
});
