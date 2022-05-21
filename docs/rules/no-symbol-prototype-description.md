# es-roikoren/no-symbol-prototype-description
> disallow the `Symbol.prototype.description` property.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2019`, `plugin:es-roikoren/restrict-to-es3`, `plugin:es-roikoren/restrict-to-es5`, `plugin:es-roikoren/restrict-to-es2015`, `plugin:es-roikoren/restrict-to-es2016`, `plugin:es-roikoren/restrict-to-es2017`, and `plugin:es-roikoren/restrict-to-es2018`

This rule reports ES2019 [`Symbol.prototype.description` property](https://github.com/tc39/proposal-Symbol-description) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-symbol-prototype-description: [error, { aggressive: true }] */
Symbol('foo').description;
```

## 🔧 Options

This rule has an option.

```yml
rules:
  es-roikoren/no-symbol-prototype-description: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings.es.aggressive` setting.

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.11/src/rules/no-symbol-prototype-description.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.11/tests/src/rules/no-symbol-prototype-description.ts)
