# es-roikoren/no-string-fromcodepoint
> disallow the `String.fromCodePoint` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `String.fromCodePoint` as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-string-fromcodepoint: error */
const thumbUp = String.fromCodePoint(0x1F44D);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.2/src/rules/no-string-fromcodepoint.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.2/tests/src/rules/no-string-fromcodepoint.ts)
