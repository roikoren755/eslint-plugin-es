# es-roikoren/no-object-defineproperty
> disallow the `Object.defineProperty` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es5` and `plugin:es-roikoren/restrict-to-es3`

This rule reports ES5 `Object.defineProperty` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-object-defineproperty: error */
Object.defineProperty(obj, 'prop', {});
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.4/src/rules/no-object-defineproperty.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.4/tests/src/rules/no-object-defineproperty.ts)
