import { ASTUtils } from '@typescript-eslint/experimental-utils';
import type { TSESLint } from '@typescript-eslint/experimental-utils';

export const referenceTracker = (
  context: TSESLint.RuleContext<'forbidden', readonly []>,
  traceMap: ASTUtils.ReferenceTracker.TraceMap<boolean>,
): TSESLint.RuleListener => ({
  'Program:exit'() {
    const tracker = new ASTUtils.ReferenceTracker(context.getScope());

    for (const { node, path } of tracker.iterateGlobalReferences(traceMap)) {
      context.report({ node, messageId: 'forbidden', data: { name: path.join('.') } });
    }
  },
});
