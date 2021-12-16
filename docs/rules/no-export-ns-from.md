# es-roikoren/no-export-ns-from
> disallow `export * as ns`.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2020`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, `plugin:es-roikoren/restrict-to-es2017`, `plugin:es-roikoren/restrict-to-es2018`, and `plugin:es-roikoren/restrict-to-es2019`

This rule reports ES2020 [`export * as ns`](https://github.com/tc39/proposal-export-ns-from) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-export-ns-from: error */
export * as ns from 'mod';
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v1.0.1/src/rules/no-export-ns-from.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v1.0.1/tests/src/rules/no-export-ns-from.ts)
