import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-computed-properties';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.Property, data: {} };

new RuleTester().run('no-computed-properties', rule, {
  valid: ['({ foo: 1 })', '({ foo })', '({ foo() {} })'],
  invalid: [
    { code: '({ [a]: 1 })', errors: [{ ...error, column: 4 }] },
    { code: '({ [a]() {} })', errors: [{ ...error, column: 4 }] },
    { code: '({ get [a]() {} })', errors: [{ ...error, column: 4 }] },
    { code: '({ set [a](value) {} })', errors: [{ ...error, column: 4 }] },
    { code: '({ [a]: b } = obj)', errors: [{ ...error, column: 4 }] },
    { code: 'function f({ [a]: b }) {}', errors: [{ ...error, column: 14 }] },
    { code: 'class A { [a]() {} }', errors: [{ ...error, column: 11, type: AST_NODE_TYPES.MethodDefinition }] },
    { code: 'class A { get [a]() {} }', errors: [{ ...error, column: 11, type: AST_NODE_TYPES.MethodDefinition }] },
    { code: 'class A { set [a](value) {} }', errors: [{ ...error, column: 11, type: AST_NODE_TYPES.MethodDefinition }] },
    { code: 'class A { static [a]() {} }', errors: [{ ...error, column: 11, type: AST_NODE_TYPES.MethodDefinition }] },
    { code: '(class A { [a]() {} })', errors: [{ ...error, column: 12, type: AST_NODE_TYPES.MethodDefinition }] },
    { code: '(class A { get [a]() {} })', errors: [{ ...error, column: 12, type: AST_NODE_TYPES.MethodDefinition }] },
    {
      code: '(class A { set [a](value) {} })',
      errors: [{ ...error, column: 12, type: AST_NODE_TYPES.MethodDefinition }],
    },
    { code: '(class A { static [a]() {} })', errors: [{ ...error, column: 12, type: AST_NODE_TYPES.MethodDefinition }] },
  ],
});
