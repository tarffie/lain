import i18n from 'i18n';
import { join, dirname } from 'node:path';
import { config } from './config.js';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));


i18n.configure({
  locales: ['en', 'pt_br'],
  directory: join(__dirname, '..', 'locales'),
  defaultLocale: 'en',
  retryInDefaultLocale: true,
  objectNotation: true,
  register: global,

  logWarnFn: (msg) => console.warn(`i18n Warning: ${msg}`),
  logErrorFn: (msg) => console.error(`i18n Error: ${msg}`),
  missingKeyFn: (_locale, value) => value,

  mustacheConfig: {
    tags: ['{{', '}}'],
    disable: false,
  },
});

i18n.setLocale(config.LOCALE);

export { i18n };
