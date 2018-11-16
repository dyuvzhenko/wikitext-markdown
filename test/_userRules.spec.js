const { wikitextToMarkdown, markdownToWikitext } = require('../src');
const testTexts = require('./utils/testTexts');

describe(`Tests on skip default parsing rules`, () => {
  it(`should correctly use custom parsing rules (wiki to markdown)`, () => {
    const wikiText = '<custom-wiki-tag>Lorem ipsum dolor sit amet</custom-wiki-tag>';
    const markdownText = '+++ Lorem ipsum dolor sit amet +++';
    function parseCustomTag(line) {
      return line.replace(/<custom-wiki-tag>(.*)<\/custom-wiki-tag>/g, `+++ $1 +++`)
    }

    expect(wikitextToMarkdown(wikiText, { customRules: [parseCustomTag] })).toBe(markdownText);
    expect(wikitextToMarkdown(wikiText)).toBe(wikiText);
  });

  it(`should correctly use custom parsing rules (markdown to wiki)`, () => {
    const wikiText = '<custom-wiki-tag>Lorem ipsum dolor sit amet</custom-wiki-tag>';
    const markdownText = '+++ Lorem ipsum dolor sit amet +++';
    function parseCustomTag(line) {
      return line.replace(/[\+]{3}(.*)[\+]{3}/g, `<custom-wiki-tag> $1 </custom-wiki-tag>`)
    }

    expect(markdownToWikitext(wikiText, { customRules: [parseCustomTag] })).toBe(wikiText);
    expect(markdownToWikitext(markdownText)).toBe(markdownText);
  });
});
