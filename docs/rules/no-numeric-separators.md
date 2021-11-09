# es-roikoren/no-numeric-separators
> disallow numeric separators.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-esnext`
- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports ES2021 [numeric separators](https://github.com/tc39/proposal-numeric-separator) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-roikoren/no-numeric-separators: error */
let a = 123_456
" />

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0/src/rules/no-numeric-separators.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0/tests/src/rules/no-numeric-separators.ts)
