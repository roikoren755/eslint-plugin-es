# es-roikoren/no-number-parseint
> disallow the `Number.parseInt` property.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Number.parseInt` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-roikoren/no-number-parseint: error */
const b = Number.parseInt(value)
" />

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.1/src/rules/no-number-parseint.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.1/tests/src/rules/no-number-parseint.ts)
