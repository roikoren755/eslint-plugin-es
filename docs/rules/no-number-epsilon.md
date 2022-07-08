# es-roikoren/no-number-epsilon
> disallow the `Number.EPSILON` property.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Number.EPSILON` property as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-number-epsilon: error */
const b = Number.EPSILON;
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v3.0.1/src/rules/no-number-epsilon.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v3.0.1/tests/src/rules/no-number-epsilon.ts)
