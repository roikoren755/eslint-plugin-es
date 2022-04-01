# es-roikoren/no-object-preventextensions
> disallow the `Object.preventExtensions` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es5` and `plugin:es-roikoren/restrict-to-es3`

This rule reports ES5 `Object.preventExtensions` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-object-preventextensions: error */
Object.preventExtensions(obj);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.7/src/rules/no-object-preventextensions.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.7/tests/src/rules/no-object-preventextensions.ts)
