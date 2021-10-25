module.exports = {
  "locales": ["en", "pt", "de"],
  "defaultLocale": "en",
  "pages": {
    "*": ["common"],
    "/": ["home", "search"],
    "/recommendations": ["recommendations"]
  },
  "loadLocaleFrom": (lang, ns) =>
    // You can use a dynamic import, fetch, whatever. You should
    // return a Promise with the JSON file.
    import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
}