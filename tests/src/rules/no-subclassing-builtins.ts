import type { TSESLint } from '@typescript-eslint/experimental-utils';
import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-subclassing-builtins';
import { RuleTester } from '../../tester';

const error = (name: string): TSESLint.TestCaseError<'forbidden'> => ({
  messageId: 'forbidden',
  line: 1,
  column: 18 + name.length,
  type: AST_NODE_TYPES.Identifier,
  data: { name },
});

new RuleTester().run('no-subclassing-builtins', rule, {
  valid: [
    'class MyObject extends Object {}',
    'let Array = 0; class MyArray extends Array {}',
    'class Array {}',
    'Array',
  ],
  invalid: [
    { code: 'class MyArray extends Array {}', errors: [error('Array')] },
    { code: 'class MyBoolean extends Boolean {}', errors: [error('Boolean')] },
    { code: 'class MyError extends Error {}', errors: [error('Error')] },
    { code: 'class MyRegExp extends RegExp {}', errors: [error('RegExp')] },
    { code: 'class MyFunction extends Function {}', errors: [error('Function')] },
    { code: 'class MyMap extends Map {}', errors: [error('Map')] },
    { code: 'class MyNumber extends Number {}', errors: [error('Number')] },
    { code: 'class MyPromise extends Promise {}', errors: [error('Promise')] },
    { code: 'class MySet extends Set {}', errors: [error('Set')] },
    { code: 'class MyString extends String {}', errors: [error('String')] },
  ],
});
