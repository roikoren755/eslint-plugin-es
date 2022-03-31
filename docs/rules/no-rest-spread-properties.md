# es-roikoren/no-rest-spread-properties
> disallow rest/spread properties.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2018`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, and `plugin:es-roikoren/restrict-to-es2017`

This rule reports ES2018 [rest/spread properties](https://github.com/tc39/proposal-object-rest-spread#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-rest-spread-properties: error */
let obj = { ...obj0 };
let { a, ...rest } = obj;
({ a, ...rest } = obj);
function f({ a, ...rest }) {}
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.5/src/rules/no-rest-spread-properties.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.5/tests/src/rules/no-rest-spread-properties.ts)
