# es-roikoren/no-object-defineproperties
> disallow the `Object.defineProperties` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es5` and `plugin:es-roikoren/restrict-to-es3`

This rule reports ES5 `Object.defineProperties` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-object-defineproperties: error */
Object.defineProperties(obj, {});
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.10/src/rules/no-object-defineproperties.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.10/tests/src/rules/no-object-defineproperties.ts)
