# es-roikoren/no-map
> disallow the `Map` class.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Map` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-map: error */
let map = new Map();
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.6/src/rules/no-map.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.6/tests/src/rules/no-map.ts)
