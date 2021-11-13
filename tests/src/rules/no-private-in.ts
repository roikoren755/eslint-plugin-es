import type { TSESLint } from '@typescript-eslint/experimental-utils';
import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-private-in';

const error = (object: string): TSESLint.TestCaseError<'forbidden'> => ({
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.MemberExpression,
  data: { name: 'x', object },
});

if (!RuleTester.isSupported(2022)) {
  console.log('Skip the tests of no-private-in.');
} else {
  new RuleTester().run('no-private-in', rule, {
    valid: [
      "class A { f(obj) { return '#x' in obj } }",
      'class A { f(obj) { return x in obj } }',
      'class A { #x; f(obj) { return foo in obj.#x } }',
    ],
    invalid: [
      { code: 'class A { #x; f(obj) { return #x in obj } }', errors: [{ ...error('obj'), column: 1 }] },
      { code: 'class A { #x; f(obj) { return #x in obj.foo } }', errors: [{ ...error('object'), column: 1 }] },
      { code: 'class A { #x; f(obj) { return #x in obj.#x } }', errors: [{ ...error('object'), column: 1 }] },
    ],
  });
}
