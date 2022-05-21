# es-roikoren/no-object-isextensible
> disallow the `Object.isExtensible` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es5` and `plugin:es-roikoren/restrict-to-es3`

This rule reports ES5 `Object.isExtensible` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-object-isextensible: error */
var extensible = Object.isExtensible(obj);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.11/src/rules/no-object-isextensible.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.11/tests/src/rules/no-object-isextensible.ts)
