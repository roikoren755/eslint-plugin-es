# es-roikoren/no-array-prototype-includes
> disallow the `Array.prototype.includes` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2016`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, and `plugin:es-roikoren/restrict-to-es2015`

This rule reports ES2016 [`Array.prototype.includes` method](https://github.com/tc39/proposal-Array.prototype.includes) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-array-prototype-includes: [error, { aggressive: true }] */
foo.includes(0);
```

## 🔧 Options

This rule has an option.

```yml
rules:
  es-roikoren/no-array-prototype-includes: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings.es.aggressive` setting.

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v3.0.0/src/rules/no-array-prototype-includes.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v3.0.0/tests/src/rules/no-array-prototype-includes.ts)
