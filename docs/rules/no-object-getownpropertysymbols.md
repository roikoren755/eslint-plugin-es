# es-roikoren/no-object-getownpropertysymbols
> disallow the `Object.getOwnPropertySymbols` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Object.getOwnPropertySymbols` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-object-getownpropertysymbols: error */
const symbols = Object.getOwnPropertySymbols(obj);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.7/src/rules/no-object-getownpropertysymbols.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.7/tests/src/rules/no-object-getownpropertysymbols.ts)
