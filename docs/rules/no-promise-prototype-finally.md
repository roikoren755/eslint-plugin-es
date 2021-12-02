# es-roikoren/no-promise-prototype-finally
> disallow the `Promise.prototype.finally` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2018`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, and `plugin:es-roikoren/restrict-to-es2017`

This rule reports ES2018 [`Promise.prototype.finally` method](https://github.com/tc39/proposal-promise-finally) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-promise-prototype-finally: [error, { aggressive: true }] */
doSomethingAsync().finally(dispose);
```

## 🔧 Options

This rule has an option.

```yml
rules:
  es-roikoren/no-promise-prototype-finally: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings.es.aggressive` setting.

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.7/src/rules/no-promise-prototype-finally.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v0.0.7/tests/src/rules/no-promise-prototype-finally.ts)
