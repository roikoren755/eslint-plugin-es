# es-roikoren/no-math-tanh
> disallow the `Math.tanh` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Math.tanh` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-roikoren/no-math-tanh: error */
const n = Math.tanh(value)
" />

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.1/src/rules/no-math-tanh.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.1/tests/src/rules/no-math-tanh.ts)
