import type { TSESTree } from '@typescript-eslint/typescript-estree';
import { ASTUtils } from '@typescript-eslint/utils';

import { createRule } from '../util/create-rule';

interface IStack {
  upper: IStack | null;
  hasThis: boolean;
  hasSuper: boolean;
}

export const category = 'ES2015';
export default createRule<[], 'forbidden'>({
  name: 'no-arrow-functions',
  meta: {
    type: 'problem',
    docs: { description: 'disallow arrow function expressions.', recommended: false },
    fixable: 'code',
    schema: [],
    messages: { forbidden: 'ES2015 arrow function expressions are forbidden.' },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode();

    /**
     * ArrowFunctionExpression to FunctionExpression
     * @param  {Node} node ArrowFunctionExpression Node
     * @param  {boolean} hasThis `true` if the function has `this`.
     * @returns {string} function expression text
     */
    const toFunctionExpression = (node: TSESTree.ArrowFunctionExpression, hasThis: boolean): string => {
      const { params, body, range, async, parent } = node;
      const paramText =
        params.length > 0 ? sourceCode.text.slice(params[0].range[0], params[params.length - 1].range[1]) : '';

      const arrowToken = sourceCode.getTokenBefore(body, ASTUtils.isArrowToken);
      const preText = sourceCode.text.slice(arrowToken?.range[1], body.range[0]);
      const bodyText = sourceCode.text.slice(arrowToken?.range[1], range[1]).trim();
      let resultText = `function(${paramText}) ${bodyText}`;

      if (body.type !== 'BlockStatement') {
        resultText = preText.includes('\n')
          ? `function(${paramText}) { return (${bodyText}) }`
          : `function(${paramText}) { return ${bodyText} }`;
      }

      if (async) {
        resultText = `async ${resultText}`;
      }

      if (hasThis) {
        resultText += '.bind(this)';
      }

      if (parent?.type === 'ExpressionStatement' && !ASTUtils.isParenthesized(node, sourceCode)) {
        resultText = `(${resultText})`;
      }

      return resultText;
    };

    /**
     * Report that ArrowFunctionExpression is being used
     * @param {Node} node ArrowFunctionExpression Node
     * @param {boolean} hasThis Whether `this` is referenced in` function` scope
     * @param {boolean} hasSuper Whether `super` is referenced in` function` scope
     * @returns {void}
     */
    const report = (node: TSESTree.ArrowFunctionExpression, hasThis: boolean, hasSuper: boolean): void => {
      context.report({
        node,
        messageId: 'forbidden',
        fix(fixer) {
          if (hasSuper) {
            return null;
          }

          return fixer.replaceText(node, toFunctionExpression(node, hasThis));
        },
      });
    };

    let stack: IStack = { upper: null, hasThis: false, hasSuper: false };

    return {
      ':function'() {
        stack = { upper: stack, hasThis: false, hasSuper: false };
      },
      ':function:exit'(node: TSESTree.Node) {
        const { hasThis, hasSuper, upper } = stack;

        stack = upper as IStack;

        if (node.type === 'ArrowFunctionExpression') {
          report(node, hasThis, hasSuper);

          stack.hasThis ||= hasThis;
          stack.hasSuper ||= hasSuper;
        }
      },
      ThisExpression() {
        stack.hasThis = true;
      },
      Super() {
        stack.hasSuper = true;
      },
    };
  },
});
