# es-roikoren/no-object-is
> disallow the `Object.is` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Object.is` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-object-is: error */
const negZero = Object.is(value, -0);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.2/src/rules/no-object-is.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.2/tests/src/rules/no-object-is.ts)
