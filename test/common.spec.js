const { wikitextToMarkdown, markdownToWikitext } = require('../src');

describe('Common tests', () => {
  it('should change headings', () => {
    const text = '=Heading=';
    const expectedText = '# Heading';
    expect(wikitextToMarkdown(text)).toEqual(expectedText);
  });
});
