# es-roikoren/no-weak-set
> disallow the `WeakSet` class.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `WeakSet` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-weak-set: error */
let set = new WeakSet();
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v1.0.0/src/rules/no-weak-set.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v1.0.0/tests/src/rules/no-weak-set.ts)
