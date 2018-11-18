const Converter = require('../../new-src');

describe(`Tests on skip default parsing rules`, () => {
  it(`should correctly use custom parsing rules (wiki to markdown)`, () => {
    const wikiText = '<custom-wiki-tag>Lorem ipsum dolor sit amet</custom-wiki-tag>';
    const markdownText = '+++ Lorem ipsum dolor sit amet +++';
    function parseCustomTag(line) {
      return line.replace(/<custom-wiki-tag>(.*)<\/custom-wiki-tag>/g, `+++ $1 +++`)
    }

    const defaultConverter = new Converter();
    const customConverter = new Converter({
      custom: {
        wikiToMarkdown: [parseCustomTag]
      }
    });

    expect(customConverter.toMarkdown(wikiText)).toBe(markdownText);
    expect(defaultConverter.toMarkdown(wikiText)).toBe(wikiText);
  });

  it(`should correctly use custom parsing rules (markdown to wiki)`, () => {
    const wikiText = '<custom-wiki-tag>Lorem ipsum dolor sit amet</custom-wiki-tag>';
    const markdownText = '+++ Lorem ipsum dolor sit amet +++';
    function parseCustomTag(line) {
      return line.replace(/[\+]{3}(.*)[\+]{3}/g, `<custom-wiki-tag> $1 </custom-wiki-tag>`)
    }

    const defaultConverter = new Converter();
    const customConverter = new Converter({
      custom: {
        markdownToWiki: [parseCustomTag]
      }
    });

    expect(customConverter.toWiki(wikiText)).toBe(wikiText);
    expect(defaultConverter.toWiki(markdownText)).toBe(markdownText);
  });
});
