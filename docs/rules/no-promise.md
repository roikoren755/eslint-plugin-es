# es-roikoren/no-promise
> disallow the `Promise` class.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Promise` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-promise: error */
let p = new Promise();
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.10/src/rules/no-promise.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.10/tests/src/rules/no-promise.ts)
