const Converter = require('../../../src');

describe(`Tests on italic markup`, () => {
  it(`should change italic markup with html italic tag (wiki to markdown)`, () => {
    const wikiText = `''Lorem'' ipsum <i>dolor</i> sit amet`;
    const markdownText = '_Lorem_ ipsum _dolor_ sit amet';
    const converter = new Converter({ preset: 'default-with-html' });

    expect(converter.toMarkdown(wikiText)).toBe(markdownText);
  });

  it(`should change italic markup with html italic tag (wiki to markdown)`, () => {
    const markdownText = '_Lorem_ ipsum <i>dolor</i> sit amet';
    const wikiText = `''Lorem'' ipsum ''dolor'' sit amet`;
    const converter = new Converter({ preset: 'default-with-html' });

    expect(converter.toWiki(markdownText)).toBe(wikiText);
  });
});
