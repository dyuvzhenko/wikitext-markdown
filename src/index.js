const { getRulesForParseWikitextToMarkdown, getRulesForParseMarkdownToWikitext } = require('./preset');

class Converter {
  constructor(settings = {}) {
    this.preset = settings.preset || 'default'
    /* init rules */
    let toMarkdownRules = getRulesForParseWikitextToMarkdown(this.preset)
    let toWikiRules = getRulesForParseMarkdownToWikitext(this.preset)

    /* skip rules selected by user */
    if (settings.skip && Array.isArray(settings.skip)) {
      if (settings.skip.some(e => e === 'blockquote')) { // TODO: remove that
        settings.skip = [...settings.skip, 'blockquoteFirstPass', 'blockquoteSecondPass']
      }

      toMarkdownRules = toMarkdownRules.filter(func => !settings.skip.some(e => e === func.name))
      toWikiRules = toWikiRules.filter(func => !settings.skip.some(e => e === func.name))
    }

    /* add custom rules */
    if (settings.custom) {
      if (settings.custom.wikiToMarkdown && Array.isArray(settings.custom.wikiToMarkdown)) {
        toMarkdownRules = [...toMarkdownRules, ...settings.custom.wikiToMarkdown]
      }

      if (settings.custom.markdownToWiki && Array.isArray(settings.custom.markdownToWiki)) {
        toWikiRules = [...toWikiRules, ...settings.custom.markdownToWiki]
      }
    }

    this.toMarkdownRules = toMarkdownRules
    this.toWikiRules = toWikiRules
  }

  toWiki(text) {
    let newText = text.split('\n')
    this.toWikiRules.forEach(rule => newText = newText.map(rule))
    return newText.join('\n')
  }

  toMarkdown(text) {
    let newText = text.split('\n')
    this.toMarkdownRules.forEach(rule => newText = newText.map(rule))
    newText = newText.filter(line => line !== 'BLOCKQUOTE_START' && line !== 'BLOCKQUOTE_END') // TODO: remove that
    return newText.join('\n')
  }
}

/*  // Example
const converter = new Converter({
  preset: 'default', // `default` or `default-with-html`
  skip: ['headings'], // name of function
  custom: {
    wikiToMarkdown: [],
    markdownToWiki: []
  }
});

converter.toWiki('> text');
converter.toMarkdown('<blockqoute>text</blockqoute>')
*/
module.exports = Converter;
