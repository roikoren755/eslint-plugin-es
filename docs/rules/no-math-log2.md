# es-roikoren/no-math-log2
> disallow the `Math.log2` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Math.log2` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-roikoren/no-math-log2: error */
const n = Math.log2(value)
" />

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0/src/rules/no-math-log2.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0/tests/src/rules/no-math-log2.ts)
