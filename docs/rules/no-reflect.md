# es-roikoren/no-reflect
> disallow the `Reflect` class.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Reflect` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-reflect: error */
let value = Reflect.get(obj, key);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.4/src/rules/no-reflect.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.4/tests/src/rules/no-reflect.ts)
