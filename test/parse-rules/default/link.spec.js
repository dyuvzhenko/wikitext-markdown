const testTexts = require('../../_utils/testTexts');

describe(`Tests on link markup`, () => {
  it(`should change link markup (simple case)`, () => {
    const wikiText = `[url text]`;
    const markdownText = '[text](url)';
    testTexts(wikiText, markdownText);
  });

  it(`should change link markup (link in middle of text)`, () => {
    const wikiText = `Lorem ipsum [url text] dolor sit amet`;
    const markdownText = 'Lorem ipsum [text](url) dolor sit amet';
    testTexts(wikiText, markdownText);
  });

  it(`should change link markup (text with many words)`, () => {
    const wikiText = `[url text with many words]`;
    const markdownText = '[text with many words](url)';
    testTexts(wikiText, markdownText);
  });

  it(`should change link markup (link in middle of text with many words in text of link)`, () => {
    const wikiText = `Lorem ipsum [url text with many words] dolor sit amet`;
    const markdownText = 'Lorem ipsum [text with many words](url) dolor sit amet';
    testTexts(wikiText, markdownText);
  });

  it(`should change link markup (two links)`, () => {
    const wikiText = `[url1 text1] and [url2 text2]`;
    const markdownText = '[text1](url1) and [text2](url2)';
    testTexts(wikiText, markdownText);
  });

  it(`should change link markup (two links and more)`, () => {
    const wikiText = `[url1 text1] and [url2 text2] and [url3 text3] and [url4 text4]`;
    const markdownText = '[text1](url1) and [text2](url2) and [text3](url3) and [text4](url4)';
    testTexts(wikiText, markdownText);
  });

  it(`should change link markup (two links with text that contains many words)`, () => {
    const wikiText = `[url1 text with many words 1] and [url2 text with many words 2]`;
    const markdownText = '[text with many words 1](url1) and [text with many words 2](url2)';
    testTexts(wikiText, markdownText);
  });
});

describe(`Tests on link markup with inline styles inside (bold and inline)`, () => {
  it(`should change link markup correctly with next symbol: _`, () => {
    const markdownText = `[long_text_2](long_url_1)`;
    const wikiText = `[long_url_1 long_text_2]`;
    // testTexts(wikiText, markdownText);
  });

  it(`should change link markup correctly with next symbol: ''`, () => {
    const wikiText = `[long''url''1 long''text''2]`;
    const markdownText = `[long''text''2](long''url''1)`;
    // testTexts(wikiText, markdownText);
  });

  it(`should change link markup correctly with next symbol: **`, () => {
    const markdownText = `[long**text**2](long**url**1)`;
    const wikiText = `[long**url**1 long**text**2]`;
    // testTexts(wikiText, markdownText);
  });

  it(`should change link markup correctly with next symbol: '''`, () => {
    const wikiText = `[long'''url'''1 long'''text'''2]`;
    const markdownText = `[long'''text'''2](long'''url'''1)`;
    // testTexts(wikiText, markdownText);
  });
});
