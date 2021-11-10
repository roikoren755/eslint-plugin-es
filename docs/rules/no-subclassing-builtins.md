# es-roikoren/no-subclassing-builtins
> disallow the subclassing of the built-in classes.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 subclassing of built-in classes as errors.

The built-in classes include the following classes (constructors):

- `Array`
- `Boolean`
- `Error`
- `RegExp`
- `Function`
- `Map`
- `Number`
- `Promise`
- `Set`
- `String`

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-subclassing-builtins: error */
class MyArray extends Array {
  // ...
}
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.1/src/rules/no-subclassing-builtins.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.1/tests/src/rules/no-subclassing-builtins.ts)
