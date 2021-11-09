import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-property-shorthands';

const error = { messageId: 'forbidden' as const, line: 1, column: 4, type: AST_NODE_TYPES.Property, data: {} };

new RuleTester().run('no-property-shorthands', rule, {
  valid: [
    '({})',
    '({ a: 1 })',
    '({ a: function(){} })',
    '({ get a() {}, set a(value) {} })',
    '({ [a]: 1 })',
    '({ ...a })',
    '({ a } = obj)',
  ],
  invalid: [
    { code: '({ a })', output: '({ a: a })', errors: [error] },
    { code: '({ a() {} })', output: '({ a: function() {} })', errors: [error] },
    { code: '({ * a() {} })', output: '({ a: function*() {} })', errors: [error] },
    { code: '({ [a]() {} })', output: '({ [a]: function() {} })', errors: [error] },
    { code: '({ async a() {} })', output: '({ a: async function() {} })', errors: [error] },
    { code: '({ async * [a]() {} })', output: '({ [a]: async function*() {} })', errors: [error] },
  ],
});
