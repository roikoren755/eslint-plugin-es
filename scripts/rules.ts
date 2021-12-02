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
  revision: number | 'typescript';
  configName?: string;
  aboveConfigName?: string;
  rules: IRule[];
  experimental?: boolean;
}

export const categories = [13, 12, 11, 10, 9, 8, 7, 6, 5].reduce<Record<string, ICategory>>(
  (map, revision, _, [latest]) => {
    const year = revision <= 5 ? 5 : 2009 + revision;
    const id = `ES${year}`;

    map[id] = { revision, rules: [], experimental: revision === latest };

    return map;
  },
  { typescript: { revision: 'typescript', rules: [] } },
);

export const rules: IRule[] = [];

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
      default: TSESLint.RuleModule<'forbidden'>;
      category: string;
      typescript?: boolean;
    };

    const {
      category,
      default: {
        meta: { docs, fixable },
      },
      typescript,
    } = content;
    const description = docs?.description ?? '';
    const rule = { ruleId, description, fixable: !!fixable };

    if (category) {
      categories[category].rules.push(rule);
    }

    if (typescript) {
      categories.typescript.rules.push(rule);
    }

    rules.push(rule);
  }
})(libRoot);
