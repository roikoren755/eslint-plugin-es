# es-roikoren/no-number-isnan
> disallow the `Number.isNaN` property.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Number.isNaN` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-number-isnan: error */
const b = Number.isNaN(value);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.11/src/rules/no-number-isnan.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.11/tests/src/rules/no-number-isnan.ts)
