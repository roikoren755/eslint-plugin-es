# es-roikoren/no-object-values
> disallow the `Object.values` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2017`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, and `plugin:es-roikoren/restrict-to-es2016`

This rule reports ES2017 `Object.values` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-object-values: error */
const values = Object.values(obj);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.11/src/rules/no-object-values.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.11/tests/src/rules/no-object-values.ts)
