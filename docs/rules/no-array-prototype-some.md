# es-roikoren/no-array-prototype-some
> disallow the `Array.prototype.some` method.

- ✅ The following configurations enable this rule: `plugin:es-roikoren/no-new-in-es5` and `plugin:es-roikoren/restrict-to-es3`

This rule reports ES5 `Array.prototype.some` method as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

```js
/*eslint es-roikoren/no-array-prototype-some: [error, { aggressive: true }] */
foo.some((e) => e !== 0);
```

## 🔧 Options

This rule has an option.

```yml
rules:
  es-roikoren/no-array-prototype-some: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings.es.aggressive` setting.

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.2/src/rules/no-array-prototype-some.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v2.0.2/tests/src/rules/no-array-prototype-some.ts)
