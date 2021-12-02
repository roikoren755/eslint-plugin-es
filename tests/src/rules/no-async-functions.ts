import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-async-functions';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, type: AST_NODE_TYPES.FunctionExpression, data: {} };

new RuleTester().run('no-async-functions', rule, {
  valid: [
    'function f() {}',
    'const f = function() {}',
    'const f = () => {}',
    '({ method() {} })',
    'class A { method() {} }',
    '(class { method() {} })',
  ],
  invalid: [
    { code: 'async function f() {}', errors: [{ ...error, column: 1, type: AST_NODE_TYPES.FunctionDeclaration }] },
    { code: 'const f = async function() {}', errors: [{ ...error, column: 11 }] },
    {
      code: 'const f = async () => {}',
      errors: [{ ...error, column: 11, type: AST_NODE_TYPES.ArrowFunctionExpression }],
    },
    { code: '({ async method() {} })', errors: [{ ...error, column: 16 }] },
    { code: 'class A { async method() {} }', errors: [{ ...error, column: 23 }] },
    { code: '(class { async method() {} })', errors: [{ ...error, column: 22 }] },
  ],
});
