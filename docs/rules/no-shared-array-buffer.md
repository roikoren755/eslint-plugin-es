# es-roikoren/no-shared-array-buffer
> disallow the `SharedArrayBuffer` class.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2017`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, and `plugin:es-roikoren/restrict-to-es2016`

This rule reports ES2017 `SharedArrayBuffer` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-shared-array-buffer: error */
let buffer = new SharedArrayBuffer(10);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.5/src/rules/no-shared-array-buffer.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.5/tests/src/rules/no-shared-array-buffer.ts)
