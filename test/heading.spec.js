const { wikitextToMarkdown, markdownToWikitext } = require('../src'); // TODO: remove
const testTexts = require('./utils/testTexts');

describe('Heading tests', () => {
  it('common test', () => {
    const wikiText = '===Heading===';
    const markdownText = '### Heading';
    // testTexts(wikiText, markdownText);
  });

  it('should change headings', () => {
    const text = '= Heading =';
    const expectedText = '# Heading';
    expect(wikitextToMarkdown(text)).toEqual(expectedText);
  });

  it('should change headings', () => {
    const text = '= Heading=';
    const expectedText = '# Heading';
    expect(wikitextToMarkdown(text)).toEqual(expectedText);
  });

  it('should change headings', () => {
    const text = '=Heading =';
    const expectedText = '# Heading';
    expect(wikitextToMarkdown(text)).toEqual(expectedText);
  });

  it('should change headings', () => {
    const text = `=  Heading=`;
    const expectedText = '#  Heading';
    expect(wikitextToMarkdown(text)).toEqual(expectedText);
  });

  // it('should change headings', () => {
  //   const text = `=Heading  =`;
  //   const expectedText = '# Heading';
  //   expect(wikitextToMarkdown(text)).toEqual(expectedText);
  // });

  // it('should change headings', () => {
  //   const text = `== Heading ==   `;
  //   const expectedText = '## Heading';
  //   expect(wikitextToMarkdown(text)).toEqual(expectedText);
  // });
});
