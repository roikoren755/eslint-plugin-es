# es-roikoren/no-proxy
> disallow the `Proxy` class.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Proxy` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-proxy: error */
let p = new Proxy(obj, hooks);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.3/src/rules/no-proxy.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.3/tests/src/rules/no-proxy.ts)
