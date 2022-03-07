# es-roikoren/no-date-now
> disallow the `Date.now` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es5` and `plugin:es-roikoren/restrict-to-es3`

This rule reports ES5 `Date.now` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-date-now: error */
var now = Date.now();
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.2/src/rules/no-date-now.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.2/tests/src/rules/no-date-now.ts)
