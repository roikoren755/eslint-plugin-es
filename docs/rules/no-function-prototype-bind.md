# es-roikoren/no-function-prototype-bind
> disallow the `Function.prototype.bind` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es5` and `plugin:es-roikoren/restrict-to-es3`

This rule reports ES5 `Function.prototype.bind` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-function-prototype-bind: error */
foo.bind(this);

var foo = (function() {
  return this.bar;
}).bind(this);
```

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.3/src/rules/no-function-prototype-bind.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.3/tests/src/rules/no-function-prototype-bind.ts)
