# es-roikoren/no-array-prototype-keys
> disallow the `Array.prototype.keys` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Array.prototype.keys` method as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-array-prototype-keys: [error, { aggressive: true }] */
foo.keys();
```

## 🔧 Options

This rule has an option.

```yml
rules:
  es-roikoren/no-array-prototype-keys: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings.es.aggressive` setting.

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v3.0.1/src/rules/no-array-prototype-keys.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v3.0.1/tests/src/rules/no-array-prototype-keys.ts)
