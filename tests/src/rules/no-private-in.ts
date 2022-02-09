import { AST_NODE_TYPES } from '@typescript-eslint/types';
import type { TSESLint } from '@typescript-eslint/utils';

import rule from '../../../src/rules/no-private-in';
import { RuleTester } from '../../tester';

const error = (object: string): TSESLint.TestCaseError<'forbidden'> => ({
  messageId: 'forbidden' as const,
  line: 1,
  column: 31,
  type: AST_NODE_TYPES.PrivateIdentifier,
  data: { object, private: 'x' },
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
      { code: 'class A { #x; f(obj) { return #x in obj } }', errors: [error('obj')] },
      { code: 'class A { #x; f(obj) { return #x in obj.foo } }', errors: [error('object')] },
      { code: 'class A { #x; f(obj) { return #x in obj.#x } }', errors: [error('object')] },
    ],
  });
}
