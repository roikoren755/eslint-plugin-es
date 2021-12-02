import { AST_NODE_TYPES } from '@typescript-eslint/types';

import rule from '../../../src/rules/no-optional-catch-binding';
import { RuleTester } from '../../tester';

const error = { messageId: 'forbidden' as const, line: 1, column: 8, type: AST_NODE_TYPES.CatchClause, data: {} };

if (!RuleTester.isSupported(2019)) {
  console.log('Skip the tests of no-optional-catch-binding.');
} else {
  new RuleTester().run('no-optional-catch-binding', rule, {
    valid: ['try {} catch (err) {}'],
    invalid: [{ code: 'try {} catch {}', errors: [error] }],
  });
}
