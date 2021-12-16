# es-roikoren/no-object-getownpropertydescriptor
> disallow the `Object.getOwnPropertyDescriptor` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es5` and `plugin:es-roikoren/restrict-to-es3`

This rule reports ES5 `Object.getOwnPropertyDescriptor` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-object-getownpropertydescriptor: error */
var descriptors = Object.getOwnPropertyDescriptor(obj);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.0/src/rules/no-object-getownpropertydescriptor.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.0/tests/src/rules/no-object-getownpropertydescriptor.ts)
