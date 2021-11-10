import { readdirSync } from 'fs';
import path from 'path';
import type { TSESLint } from '@typescript-eslint/experimental-utils';

const libRoot = path.resolve(__dirname, '../src/rules');

export interface IRule {
  ruleId: string;
  description: string;
  fixable: boolean;
}

export interface ICategory {
  id: string;
  revision: number;
  configName?: string;
  aboveConfigName?: string;
  rules: IRule[];
  experimental?: boolean;
}

const categories = [12, 11, 10, 9, 8, 7, 6, 5].reduce<Record<string, ICategory>>((map, revision, _, [latest]) => {
  const year = revision <= 5 ? 5 : 2009 + revision;
  const id = `ES${year}`;

  map[id] = {
    id,
    revision,
    rules: [],
    experimental: revision === latest,
  };

  return map;
}, {});

const rules: IRule[] = [];

(function walk(dirPath) {
  for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      walk(path.join(dirPath, entry.name));

      continue;
    }

    const filePath = path.join(dirPath, entry.name);
    const ruleId = path.relative(libRoot, filePath).replace(/\.ts$/u, '').replace(/\\/gu, '/');

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const content = require(path.join(dirPath, entry.name)) as {
      default: TSESLint.RuleModule<'forbidden', []>;
      category: string;
    };

    const {
      category,
      default: {
        meta: { docs, fixable },
      },
    } = content;
    const description = docs?.description;
    const rule = {
      ruleId,
      description: description ?? '',
      fixable: !!fixable,
    };

    if (category) {
      categories[category].rules.push(rule);
    }

    rules.push(rule);
  }
})(libRoot);

export { categories, rules };
