# es-roikoren/no-number-parsefloat
> disallow the `Number.parseFloat` property.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Number.parseFloat` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-number-parsefloat: error */
const b = Number.parseFloat(value);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.0/src/rules/no-number-parsefloat.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.0/tests/src/rules/no-number-parsefloat.ts)
