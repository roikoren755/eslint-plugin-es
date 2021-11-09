import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { RuleTester } from '../../tester';
import rule from '../../../src/rules/no-dynamic-import';

const error = { messageId: 'forbidden' as const, line: 1, column: 1, type: AST_NODE_TYPES.ImportExpression, data: {} };

if (!RuleTester.isSupported(2020)) {
  console.log('Skip the tests of no-dynamic-import.');
} else {
  new RuleTester().run('no-dynamic-import', rule, {
    valid: [{ code: "import a from 'a'", parserOptions: { sourceType: 'module' } }, 'obj.\nimport(source)'],
    invalid: [{ code: 'import(source)', errors: [error] }],
  });
}
