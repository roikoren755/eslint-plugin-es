# es-roikoren/no-typed-arrays
> disallow ES2015 typed arrays.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 typed arrays as errors.

- `Int8Array`
- `Uint8Array`
- `Uint8ClampedArray`
- `Int16Array`
- `Uint16Array`
- `Int32Array`
- `Uint32Array`
- `Float32Array`
- `Float64Array`
- `DataView`

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-typed-arrays: error */
let numbers = new Int32Array(10);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0-alpha-20211010133854/src/rules/no-typed-arrays.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.0-alpha-20211010133854/tests/src/rules/no-typed-arrays.ts)
