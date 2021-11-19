# es-roikoren/no-object-hasown
> disallow the `Object.hasOwn` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-esnext`

This rule reports ES2022 `Object.hasOwn` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-object-hasown: error */
const hasFoo = Object.hasOwn(obj, 'foo');
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.5/src/rules/no-object-hasown.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.5/tests/src/rules/no-object-hasown.ts)
