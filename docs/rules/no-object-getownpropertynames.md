# es-roikoren/no-object-getownpropertynames
> disallow the `Object.getOwnPropertyNames` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es5` and `plugin:es-roikoren/restrict-to-es3`

This rule reports ES5 `Object.getOwnPropertyNames` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-object-getownpropertynames: error */
Object.getOwnPropertyNames(obj, 'prop', {});
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.6/src/rules/no-object-getownpropertynames.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.6/tests/src/rules/no-object-getownpropertynames.ts)
