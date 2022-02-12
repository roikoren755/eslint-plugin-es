# es-roikoren/no-object-seal
> disallow the `Object.seal` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es5` and `plugin:es-roikoren/restrict-to-es3`

This rule reports ES5 `Object.seal` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-object-seal: error */
Object.seal(obj);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.1/src/rules/no-object-seal.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.1/tests/src/rules/no-object-seal.ts)
