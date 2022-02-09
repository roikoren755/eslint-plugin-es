import { readFileSync, readdirSync, writeFileSync } from 'fs';
import path from 'path';

import { TSESLint } from '@typescript-eslint/utils';

import { version } from '../package.json';

import { rules } from './rules';
import { formatList } from './update-docs-readme';

const run = async (): Promise<void> => {
  const docsRoot = path.resolve(__dirname, '../docs/rules/');
  const configRoot = path.resolve(__dirname, '../src/configs/');
  const getRules = async (filename: string): Promise<Set<string>> => {
    const {
      default: { extends: otherConfigs, ...overrideConfig },
    } = (await import(filename.startsWith('/') ? filename : path.join(configRoot, filename))) as {
      default: TSESLint.Linter.ConfigOverride;
    };

    const engine = new TSESLint.ESLint({ overrideConfig, useEslintrc: false });
    const config = await engine.calculateConfigForFile('a.ts');
    const others = otherConfigs ?? [];
    const ruleIds = Object.keys(config.rules ?? {});

    await Promise.all(
      (Array.isArray(others) ? others : [others]).map(async (other) => {
        ruleIds.push(...(await getRules(other)));
      }),
    );

    return new Set(ruleIds);
  };
  const configs = await Promise.all(
    readdirSync(configRoot).map(async (filename) => {
      const id = `plugin:es-roikoren/${path.basename(filename, '.ts')}`;
      const ruleIds = await getRules(filename);

      return { id, ruleIds };
    }),
  );
  const collator = new Intl.Collator('en', { numeric: true });

  for (const { ruleId, description, fixable } of rules) {
    const filePath = path.join(docsRoot, `${ruleId}.md`);
    const content = readFileSync(filePath, 'utf8')
      .replace(/^#.+\n>.+\n+(?:- .+\n)*/u, '')
      .replace(/## 📚 References[\s\S]+/u, '')
      .trim();
    const enabledConfigIds = configs
      .filter((c) => !c.id.includes('typescript') && c.ruleIds.has(`es-roikoren/${ruleId}`))
      .map((c) => `\`${c.id}\``)
      .sort(collator.compare.bind(collator));
    const headerLines = [`# es-roikoren/${ruleId}`, `> ${description}`, ''];

    if (enabledConfigIds.length > 0) {
      headerLines.push(`- ✅ The following configurations enable this rule: ${formatList(enabledConfigIds)}`);
    }

    if (fixable) {
      headerLines.push(
        '- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.',
      );
    }

    const newContent = `${headerLines.join('\n').trim()}

${content}

## 📚 References

- [Rule source](https://github.com/roikoren755/eslint-plugin-es/blob/v${version}/src/rules/${ruleId}.ts)
- [Test source](https://github.com/roikoren755/eslint-plugin-es/blob/v${version}/tests/src/rules/${ruleId}.ts)
`;

    writeFileSync(filePath, newContent);
  }
};

run().catch(console.error);
