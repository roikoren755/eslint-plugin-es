# es-roikoren/no-object-fromentries
> disallow the `Object.fromEntries` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2019`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, `plugin:es-roikoren/restrict-to-es2017`, and `plugin:es-roikoren/restrict-to-es2018`

This rule reports ES2019 `Object.fromEntries` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-object-fromentries: error */
const obj = Object.fromEntries(map);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.6/src/rules/no-object-fromentries.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.6/tests/src/rules/no-object-fromentries.ts)
