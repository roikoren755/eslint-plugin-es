import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-keyword-properties';
import { RuleTester } from '../../tester';

const baseError = { messageId: 'forbidden' as const, line: 1, data: {} };
const propertyError = { ...baseError, column: 4, type: AST_NODE_TYPES.Property };
const memberError = { ...baseError, column: 1, type: AST_NODE_TYPES.MemberExpression };

new RuleTester().run('no-keyword-properties', rule, {
  valid: ['({ a, b, c}.a)', '({ let: 1, of: 2}.let)', "({ 'if': 1 }['if'])"],
  invalid: [
    { code: '({ if: 1 })', errors: [propertyError] },
    { code: '({ static: 2 })', errors: [propertyError] },
    { code: 'obj.if', errors: [memberError] },
    { code: 'obj.class', errors: [memberError] },
  ],
});
