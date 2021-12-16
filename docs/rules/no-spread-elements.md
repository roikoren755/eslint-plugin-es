# es-roikoren/no-spread-elements
> disallow spread elements.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 spread elements as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-spread-elements: error */
const a1 = [1, 2, ...array];
foo(...a, ...b);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v1.0.1/src/rules/no-spread-elements.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v1.0.1/tests/src/rules/no-spread-elements.ts)
