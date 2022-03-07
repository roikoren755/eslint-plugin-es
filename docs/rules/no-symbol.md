# es-roikoren/no-symbol
> disallow the `Symbol` class.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Symbol` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-symbol: error */
let s = Symbol('s');
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.2/src/rules/no-symbol.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.2/tests/src/rules/no-symbol.ts)
