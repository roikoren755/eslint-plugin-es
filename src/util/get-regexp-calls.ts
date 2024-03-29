import type { TSESTree } from '@typescript-eslint/typescript-estree';
import { ASTUtils } from '@typescript-eslint/utils';
import type { TSESLint } from '@typescript-eslint/utils';

/**
 * Iterate the calls of the `RegExp` global variable.
 * @param {Scope} globalScope The global scope object.
 * @returns {IterableIterator<{node:Node,pattern:(string|null),flags:(string|null)}>} The iterator of `CallExpression` or `NewExpression` for `RegExp`.
 */
export function* getRegExpCalls(
  globalScope: TSESLint.Scope.Scope,
): IterableIterator<{ node: TSESTree.Node; pattern: string | null; flags: string | null }> {
  const tracker = new ASTUtils.ReferenceTracker(globalScope);

  for (const { node } of tracker.iterateGlobalReferences({
    RegExp: { [ASTUtils.ReferenceTracker.CALL]: true, [ASTUtils.ReferenceTracker.CONSTRUCT]: true },
  })) {
    if (!('arguments' in node)) {
      continue;
    }

    const [patternNode, flagsNode] = node.arguments;

    yield {
      node,
      pattern: ASTUtils.getStringIfConstant(patternNode, globalScope),
      flags: ASTUtils.getStringIfConstant(flagsNode, globalScope),
    };
  }
}
