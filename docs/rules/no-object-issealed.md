# es-roikoren/no-object-issealed
> disallow the `Object.isSealed` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es5` and `plugin:es-roikoren/restrict-to-es3`

This rule reports ES5 `Object.isSealed` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-object-issealed: error */
var sealed = Object.isSealed(obj);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.7/src/rules/no-object-issealed.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.7/tests/src/rules/no-object-issealed.ts)
