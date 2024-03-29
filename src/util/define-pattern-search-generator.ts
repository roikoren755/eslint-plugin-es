import { ASTUtils } from '@typescript-eslint/utils';

/**
 * Define generator to search pattern.
 * The iterator generated by the generator returns the start and end index of the match.
 * @param {RegExp} pattern Base pattern
 * @returns {function(string):IterableIterator<RegExpExecArray>} generator
 */
export const definePatternSearchGenerator = (pattern: RegExp): ((s: string) => IterableIterator<RegExpExecArray>) => {
  const matcher = new ASTUtils.PatternMatcher(pattern);

  return matcher.execAll.bind(matcher);
};
