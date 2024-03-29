import { AST_NODE_TYPES } from '@typescript-eslint/types';
import type { TSESLint } from '@typescript-eslint/utils';

import rule from '../../../src/rules/no-export-ns-from';
import { RuleTester } from '../../tester';

const error = {
  messageId: 'forbidden' as const,
  line: 1,
  column: 1,
  type: AST_NODE_TYPES.ExportAllDeclaration,
  data: {},
};

new RuleTester({
  parserOptions: { sourceType: 'module' },
} as TSESLint.RuleTesterConfig).run('no-export-ns-from', rule, {
  valid: [
    'export * from "mod"',
    'export default foo',
    'export {foo} from "mod"',
    'export {foo as bar} from "mod"',
    'import * as foo from "mod"',
    'import foo from "mod"',
    'import {foo} from "mod"',
    'import {foo as bar} from "mod"',
  ],
  invalid: [{ code: 'export * as ns from "mod"', errors: [error] }],
});
