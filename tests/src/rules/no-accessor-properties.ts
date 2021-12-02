import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-accessor-properties';
import { RuleTester } from '../../tester';

new RuleTester().run('no-accessor-properties', rule, {
  valid: ['({ get: function() {} })', '({ set: function() {} })', '({ get() {} })', '({ set(value) {} })'],
  invalid: [
    {
      code: '({ get a() {} })',
      errors: [{ messageId: 'forbidden', column: 4, line: 1, type: AST_NODE_TYPES.Property, data: {} }],
    },
    {
      code: '({ set a(value) {} })',
      errors: [{ messageId: 'forbidden', column: 4, line: 1, type: AST_NODE_TYPES.Property, data: {} }],
    },
    {
      code: 'class A { get a() {} }',
      errors: [{ messageId: 'forbidden', column: 11, line: 1, type: AST_NODE_TYPES.MethodDefinition, data: {} }],
    },
    {
      code: 'class A { set a(value) {} }',
      errors: [{ messageId: 'forbidden', column: 11, line: 1, type: AST_NODE_TYPES.MethodDefinition, data: {} }],
    },
  ],
});
