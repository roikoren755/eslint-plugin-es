# es-roikoren/no-number-isfinite
> disallow the `Number.isFinite` property.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Number.isFinite` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-number-isfinite: error */
const b = Number.isFinite(value);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.0/src/rules/no-number-isfinite.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.0/tests/src/rules/no-number-isfinite.ts)
