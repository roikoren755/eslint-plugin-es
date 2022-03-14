# es-roikoren/no-object-getprototypeof
> disallow the `Object.getPrototypeOf` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es5` and `plugin:es-roikoren/restrict-to-es3`

This rule reports ES5 `Object.getPrototypeOf` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-object-getprototypeof: error */
var proto = Object.getPrototypeOf(obj);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.3/src/rules/no-object-getprototypeof.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.3/tests/src/rules/no-object-getprototypeof.ts)
