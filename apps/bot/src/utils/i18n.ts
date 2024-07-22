import i18n from "i18n"
import { join, dirname } from 'node:path'
import { config } from './config.js'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url));


i18n.configure({
    locales: [
        "ar",
        "bg",
        "cs",
        "de",
        "el",
        "en",
        "es",
        "fa",
        "fr",
        "id",
        "it",
        "ja",
        "ko",
        "mi",
        "nb",
        "nl",
        "pl",
        "pt_br",
        "ro",
        "ru",
        "sv",
        "th",
        "tr",
        "uk",
        "vi",
        "zh_cn",
        "zh_sg",
        "zh_tw"
    ],
    directory: join(__dirname, '..', 'locales'),
    defaultLocale: 'en',
    retryInDefaultLocale: true,
    objectNotation: true,
    register: global,

    logWarnFn: function(msg) {
        console.log(msg)
    },

    logErrorFn: function(msg) {
        console.log(msg)
    },

    missingKeyFn: function(locale, value) {
        return value
    },
    mustacheConfig: {
        tags: ["{{", "}}"],
        disable: false
    }
})


i18n.setLocale(config.LOCALE)

export { i18n }
