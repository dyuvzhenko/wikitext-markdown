const testTexts = require('../../_utils/testTexts');

describe(`Tests on bold and italic markup`, () => {
  it(`should change bold and italic markup (first word in sentence)`, () => {
    const wikiText = `'''''Lorem''''' ipsum dolor sit amet`;
    const markdownText = '***Lorem*** ipsum dolor sit amet';
    testTexts(wikiText, markdownText);
  });

  it(`should change bold and italic markup (last word in sentence)`, () => {
    const wikiText = `Lorem ipsum dolor sit '''''amet'''''`;
    const markdownText = 'Lorem ipsum dolor sit ***amet***';
    testTexts(wikiText, markdownText);
  });

  it(`should change bold and italic markup (any word in sentence)`, () => {
    const wikiText = `Lorem ipsum '''''dolor''''' sit amet`;
    const markdownText = 'Lorem ipsum ***dolor*** sit amet';
    testTexts(wikiText, markdownText);
  });

  it(`should change bold and italic markup (part of the word in sentence)`, () => {
    const wikiText = `Lorem ipsum dol'''''or''''' sit amet`;
    const markdownText = 'Lorem ipsum dol***or*** sit amet';
    testTexts(wikiText, markdownText);
  });

  it(`should change bold and italic markup (many words in sentence)`, () => {
    const wikiText = `'''''Lorem''''' ipsum '''''dolor''''' sit '''''amet'''''`;
    const markdownText = '***Lorem*** ipsum ***dolor*** sit ***amet***';
    testTexts(wikiText, markdownText);
  });
});
