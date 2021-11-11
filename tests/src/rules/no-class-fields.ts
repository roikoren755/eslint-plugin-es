import type { TSESLint } from '@typescript-eslint/experimental-utils';
import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-class-fields';

const error = (nameWithKind: string, isPublic?: boolean): TSESLint.TestCaseError<'forbidden'> => ({
  messageId: 'forbidden',
  line: 1,
  type: isPublic ? AST_NODE_TYPES.Identifier : AST_NODE_TYPES.PrivateIdentifier,
  data: { nameWithKind },
});

if (!RuleTester.isSupported(2021)) {
  console.log('Skip the tests of no-class-fields.');
} else {
  new RuleTester().run('no-class-fields', rule, {
    valid: [
      'class A {}',
      'class A { foo() {} }',
      'class A { get foo() {} }',
      'class A { set foo(v) {} }',
      'class A { *foo() {} }',
      'class A { async foo() {} }',
      'class A { static foo() {} }',
      'class A { static get foo() {} }',
      'class A { static set foo(v) {} }',
      'class A { static *foo() {} }',
      'class A { static async foo() {} }',
      'class A { [foo]() {} }',
      'class A { get [foo]() {} }',
      'class A { set [foo](v) {} }',
      'class A { *[foo]() {} }',
      'class A { async [foo]() {} }',
      'class A { static [foo]() {} }',
      'class A { static get [foo]() {} }',
      'class A { static set [foo](v) {} }',
      'class A { static *[foo]() {} }',
      'class A { static async [foo]() {} }',
    ],
    invalid: [
      { code: 'class A { #foo() {} }', errors: [{ ...error('private method #foo'), column: 11 }] },
      { code: 'class A { get #foo() {} }', errors: [{ ...error('private getter #foo'), column: 15 }] },
      { code: 'class A { set #foo(v) {} }', errors: [{ ...error('private setter #foo'), column: 15 }] },
      { code: 'class A { *#foo() {} }', errors: [{ ...error('private generator method #foo'), column: 12 }] },
      { code: 'class A { async #foo() {} }', errors: [{ ...error('private async method #foo'), column: 17 }] },
      { code: 'class A { static #foo() {} }', errors: [{ ...error('static private method #foo'), column: 18 }] },
      { code: 'class A { static get #foo() {} }', errors: [{ ...error('static private getter #foo'), column: 22 }] },
      { code: 'class A { static set #foo(v) {} }', errors: [{ ...error('static private setter #foo'), column: 22 }] },
      {
        code: 'class A { static *#foo() {} }',
        errors: [{ ...error('static private generator method #foo'), column: 19 }],
      },
      {
        code: 'class A { static async #foo() {} }',
        errors: [{ ...error('static private async method #foo'), column: 24 }],
      },

      { code: 'class A { foo }', errors: [{ ...error("field 'foo'", true), column: 11 }] },
      { code: 'class A { foo = 42 }', errors: [{ ...error("field 'foo'", true), column: 11 }] },
      { code: 'class A { static foo }', errors: [{ ...error("static field 'foo'", true), column: 18 }] },
      { code: 'class A { static foo = 42 }', errors: [{ ...error("static field 'foo'", true), column: 18 }] },
      { code: 'class A { [foo] }', errors: [{ ...error('field [foo]', true), column: 12 }] },
      { code: 'class A { [foo] = 42 }', errors: [{ ...error('field [foo]', true), column: 12 }] },
      { code: 'class A { static [foo] }', errors: [{ ...error('static field [foo]', true), column: 19 }] },
      { code: 'class A { static [foo] = 42 }', errors: [{ ...error('static field [foo]', true), column: 19 }] },
      { code: 'class A { #foo }', errors: [{ ...error('private field #foo'), column: 11 }] },
      { code: 'class A { #foo = 42 }', errors: [{ ...error('private field #foo'), column: 11 }] },
      { code: 'class A { static #foo }', errors: [{ ...error('static private field #foo'), column: 18 }] },
      { code: 'class A { static #foo = 42 }', errors: [{ ...error('static private field #foo'), column: 18 }] },
      {
        code: `
class A {
  #a;
  #b () {}
  fn() {
    this.#a;
    x = this.#a;
    this.#a++;
    this.#a = x;
    this.#b();
  }
}`,
        errors: [
          { ...error('private field #a'), line: 3, column: 3 },
          { ...error('private method #b'), line: 4, column: 3 },
          { ...error('private access #a'), line: 6, column: 10 },
          { ...error('private access #a'), line: 7, column: 14 },
          { ...error('private access #a'), line: 8, column: 10 },
          { ...error('private access #a'), line: 9, column: 10 },
          { ...error('private method call #b()'), line: 10, column: 10 },
        ],
      },
      {
        code: `
class A {
  static #c;
  static #d;
  fn() {
    A.#c;
    x = A.#c;
    A.#c++;
    A.#c = x;
    A.#d();
  }
}`,
        errors: [
          { ...error('static private field #c'), line: 3, column: 10 },
          { ...error('static private field #d'), line: 4, column: 10 },
          { ...error('private access #c'), line: 6, column: 7 },
          { ...error('private access #c'), line: 7, column: 11 },
          { ...error('private access #c'), line: 8, column: 7 },
          { ...error('private access #c'), line: 9, column: 7 },
          { ...error('private method call #d()'), line: 10, column: 7 },
        ],
      },
    ],
  });
}
