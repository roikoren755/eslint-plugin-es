# es-roikoren/no-set
> disallow the `Set` class.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Set` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-set: error */
let set = new Set();
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v1.0.1/src/rules/no-set.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v1.0.1/tests/src/rules/no-set.ts)
