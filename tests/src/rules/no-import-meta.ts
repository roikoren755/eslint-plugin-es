import type { TSESLint } from '@typescript-eslint/experimental-utils';
import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-import-meta';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, column: 1, type: AST_NODE_TYPES.MetaProperty, data: {} };

if (!RuleTester.isSupported(2020)) {
  console.log('Skip the tests of no-import-meta.');
} else {
  new RuleTester({
    parserOptions: { sourceType: 'module' },
  } as TSESLint.RuleTesterConfig).run('no-import-meta', rule, {
    valid: ["import * as Foo from 'foo'", "import('foo')"],
    invalid: [{ code: 'import.meta', errors: [error] }],
  });
}
