# es-roikoren/no-arrow-functions
> disallow arrow function expressions.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`
- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports ES2015 arrow functions as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-arrow-functions: error */
let a = () => 100;
let b = () => { 
  doSomething();
};
```

👌 Examples of **correct** code for this rule:

<eslint-playground type="good" code="/*eslint es-roikoren/no-arrow-functions: error */
let a = function() { return 100 }
let b = function() { doSomething() }
" />

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.4/src/rules/no-arrow-functions.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.4/tests/src/rules/no-arrow-functions.ts)
