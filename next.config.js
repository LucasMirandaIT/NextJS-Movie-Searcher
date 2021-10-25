const nextTranslate = require('next-translate')

/** @type {import('next').NextConfig} */
module.exports = nextTranslate({
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'pt', 'de'],
    defaultLocale: 'en'
  },
})
