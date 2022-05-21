# es-roikoren/no-promise-any
> disallow `Promise.any` function and `AggregateError` class.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2021`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, `plugin:es-roikoren/restrict-to-es2017`, `plugin:es-roikoren/restrict-to-es2018`, `plugin:es-roikoren/restrict-to-es2019`, and `plugin:es-roikoren/restrict-to-es2020`

This rule reports ES2021 [`Promise.any`](https://github.com/tc39/proposal-promise-any) as errors.
This proposal includes the following two:

- `Promise.any` function
- `AggregateError` class

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-promise-any: error */
const p = Promise.any(promises).catch((error) => {
  if (error instanceof AggregateError) {
    // Do something.
  }
});
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.11/src/rules/no-promise-any.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.11/tests/src/rules/no-promise-any.ts)
