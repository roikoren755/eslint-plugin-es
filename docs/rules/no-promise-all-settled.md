# es-roikoren/no-promise-all-settled
> disallow `Promise.allSettled` function.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2020`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, `plugin:es-roikoren/restrict-to-es2017`, `plugin:es-roikoren/restrict-to-es2018`, and `plugin:es-roikoren/restrict-to-es2019`

This rule reports ES2020 [`Promise.allSettled` function](https://github.com/tc39/proposal-promise-allSettled) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-promise-all-settled: error */
const p = Promise.allSettled(promises);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.2/src/rules/no-promise-all-settled.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.2/tests/src/rules/no-promise-all-settled.ts)
