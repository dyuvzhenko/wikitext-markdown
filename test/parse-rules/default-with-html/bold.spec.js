const Converter = require('../../../src');

describe(`Tests on bold markup`, () => {
  it(`should change bold markup with html bold tag (wiki to markdown)`, () => {
    const wikiText = `'''Lorem''' ipsum <b>dolor</b> sit amet`;
    const markdownText = '**Lorem** ipsum **dolor** sit amet';
    const converter = new Converter({ preset: 'default-with-html' });

    expect(converter.toMarkdown(wikiText)).toBe(markdownText);
  });

  it(`should change bold markup with html bold tag (wiki to markdown)`, () => {
    const markdownText = '**Lorem** ipsum <b>dolor</b> sit amet';
    const wikiText = `'''Lorem''' ipsum '''dolor''' sit amet`;
    const converter = new Converter({ preset: 'default-with-html' });

    expect(converter.toWiki(markdownText)).toBe(wikiText);
  });
});
