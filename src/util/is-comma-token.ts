import type { TSESTree } from '@typescript-eslint/typescript-estree';

/**
 * Check whether a given token is a comma token or not.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is a comma token.
 */
export const isCommaToken = (token: TSESTree.Token | null): token is TSESTree.Token =>
  token?.type === 'Punctuator' && token.value === ',';
