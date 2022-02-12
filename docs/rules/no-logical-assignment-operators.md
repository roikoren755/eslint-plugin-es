# es-roikoren/no-logical-assignment-operators
> disallow logical assignment operators.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2021`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, `plugin:es-roikoren/restrict-to-es2017`, `plugin:es-roikoren/restrict-to-es2018`, `plugin:es-roikoren/restrict-to-es2019`, and `plugin:es-roikoren/restrict-to-es2020`
- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports ES2021 [logical assignment operators](https://github.com/tc39/proposal-logical-assignment) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-logical-assignment-operators: error */
x ||= y;
x &&= y;
x ??= y;
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.1/src/rules/no-logical-assignment-operators.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.1/tests/src/rules/no-logical-assignment-operators.ts)
