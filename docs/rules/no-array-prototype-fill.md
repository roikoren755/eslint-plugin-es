# es-roikoren/no-array-prototype-fill
> disallow the `Array.prototype.fill` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es2015`, `plugin:es-roikoren/restrict-to-es3`, and `plugin:es-roikoren/restrict-to-es5`

This rule reports ES2015 `Array.prototype.fill` method as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-array-prototype-fill: [error, { aggressive: true }] */
foo.fill(0);
```

## 🔧 Options

This rule has an option.

```yml
rules:
  es-roikoren/no-array-prototype-fill: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings.es.aggressive` setting.

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.5/src/rules/no-array-prototype-fill.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.5/tests/src/rules/no-array-prototype-fill.ts)
