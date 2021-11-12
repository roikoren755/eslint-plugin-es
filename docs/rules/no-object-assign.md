# es-roikoren/no-object-assign
> disallow the `Object.assign` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Object.assign` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-object-assign: error */
const obj = Object.assign({}, x, y);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.4/src/rules/no-object-assign.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.4/tests/src/rules/no-object-assign.ts)
