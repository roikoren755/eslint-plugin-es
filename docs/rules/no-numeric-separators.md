# es-roikoren/no-numeric-separators
> disallow numeric separators.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2021`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, `plugin:es-roikoren/restrict-to-es2017`, `plugin:es-roikoren/restrict-to-es2018`, `plugin:es-roikoren/restrict-to-es2019`, and `plugin:es-roikoren/restrict-to-es2020`
- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports ES2021 [numeric separators](https://github.com/tc39/proposal-numeric-separator) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-numeric-separators: error */
let a = 123_456;
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.0/src/rules/no-numeric-separators.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.0/tests/src/rules/no-numeric-separators.ts)
