const { getRulesForParseWikitextToMarkdown, getRulesForParseMarkdownToWikitext } = require('./preset');

class Converter { // TODO: remove function `removeSpecialSymbols` from default/wikitext-to-markdown.js
  constructor(settings = {}) {
    this.preset = settings.preset || 'default'
    this.toWikiRules = getRulesForParseWikitextToMarkdown()
    this.toMarkdownRules = getRulesForParseMarkdownToWikitext()
    // filter by settings.skip
    // add custom rules
  }

  toWiki(text) {
    let newText = text.split('\n')
    this.toWikiRules.forEach(rule => newText.map(rule))
    return newText.join('\n')
  }

  toMarkdown(text) {
    let newText = text.split('\n')
    this.toMarkdownRules.forEach(rule => newText.map(rule))
    return newText.join('\n')
  }
}

// const converter = new Converter({
//   preset: 'html',
//   skip: ['headings'],
//   custom: [parseSpecificTags]
// })

module.exports = Converter;
