# es-roikoren/no-regexp-u-flag
> disallow RegExp `u` flag.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 RegExp `u` flag as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-roikoren/no-regexp-u-flag: error */
const r1 = /[☀️☔]/u
" />

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0/src/rules/no-regexp-u-flag.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0/tests/src/rules/no-regexp-u-flag.ts)
