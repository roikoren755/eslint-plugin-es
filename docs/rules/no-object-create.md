# es-roikoren/no-object-create
> disallow the `Object.create` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es5` and `plugin:es-roikoren/restrict-to-es3`

This rule reports ES5 `Object.create` methods as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-object-create: error */
const obj = Object.assign({});
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v1.0.0/src/rules/no-object-create.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v1.0.0/tests/src/rules/no-object-create.ts)
