# es-roikoren/no-weak-map
> disallow the `WeakMap` class.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `WeakMap` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-weak-map: error */
let map = new WeakMap();
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.7/src/rules/no-weak-map.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.7/tests/src/rules/no-weak-map.ts)
