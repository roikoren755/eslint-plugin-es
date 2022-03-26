# es-roikoren/no-object-getownpropertydescriptors
> disallow the `Object.getOwnPropertyDescriptors` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2017`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, and `plugin:es-roikoren/restrict-to-es2016`

This rule reports ES2017 `Object.getOwnPropertyDescriptors` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-object-getownpropertydescriptors: error */
const descriptors = Object.getOwnPropertyDescriptors(obj);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.4/src/rules/no-object-getownpropertydescriptors.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.4/tests/src/rules/no-object-getownpropertydescriptors.ts)
